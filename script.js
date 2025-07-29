class StackFlowApp {
    constructor() {
        this.pdfFiles = [];
        this.draggedItem = null;
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    setupEventListeners() {
        // File input and upload area
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const browseBtn = document.getElementById('browseBtn');
        
        // Action buttons
        const clearBtn = document.getElementById('clearBtn');
        const mergeBtn = document.getElementById('mergeBtn');

        fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));
        browseBtn.addEventListener('click', () => fileInput.click());
        clearBtn.addEventListener('click', () => this.clearAllFiles());
        mergeBtn.addEventListener('click', () => this.mergePDFs());

        // Upload area drag and drop
        uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        uploadArea.addEventListener('drop', (e) => this.handleFileDrop(e));
    }

    setupDragAndDrop() {
        document.addEventListener('dragstart', (e) => this.handleDragStart(e));
        document.addEventListener('dragend', (e) => this.handleDragEnd(e));
        document.addEventListener('dragover', (e) => this.handleItemDragOver(e));
        document.addEventListener('drop', (e) => this.handleItemDrop(e));
    }

    handleFileSelect(files) {
        this.addFiles(Array.from(files));
    }

    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('dragover');
    }

    handleFileDrop(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
        if (files.length > 0) {
            this.addFiles(files);
        } else {
            this.showNotification('Please drop only PDF files', 'error');
        }
    }

    async addFiles(files) {
        for (const file of files) {
            if (file.type === 'application/pdf') {
                const pdfData = {
                    id: Date.now() + Math.random(),
                    file: file,
                    name: file.name,
                    size: this.formatFileSize(file.size),
                    pages: await this.getPDFPageCount(file)
                };
                this.pdfFiles.push(pdfData);
            }
        }
        this.updateUI();
    }

    async getPDFPageCount(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            return pdf.getPageCount();
        } catch (error) {
            console.error('Error reading PDF:', error);
            return 'Unknown';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updateUI() {
        const pdfListSection = document.getElementById('pdfListSection');
        const pdfList = document.getElementById('pdfList');
        const mergeBtn = document.getElementById('mergeBtn');

        if (this.pdfFiles.length === 0) {
            pdfListSection.style.display = 'none';
            return;
        }

        pdfListSection.style.display = 'block';
        mergeBtn.disabled = this.pdfFiles.length < 2;

        pdfList.innerHTML = this.pdfFiles.map((pdf, index) => `
            <div class="pdf-item" draggable="true" data-id="${pdf.id}">
                <div class="pdf-order">${index + 1}</div>
                <div class="pdf-icon">📄</div>
                <div class="pdf-info">
                    <div class="pdf-name">${pdf.name}</div>
                    <div class="pdf-details">${pdf.size} • ${pdf.pages} pages</div>
                </div>
                <div class="pdf-actions">
                    <button class="remove-btn" onclick="app.removeFile('${pdf.id}')" title="Remove">×</button>
                </div>
            </div>
        `).join('');
    }

    removeFile(id) {
        this.pdfFiles = this.pdfFiles.filter(pdf => pdf.id !== id);
        this.updateUI();
    }

    clearAllFiles() {
        this.pdfFiles = [];
        this.updateUI();
    }

    // Drag and Drop for reordering
    handleDragStart(e) {
        if (!e.target.classList.contains('pdf-item')) return;
        
        this.draggedItem = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnd(e) {
        if (e.target.classList.contains('pdf-item')) {
            e.target.classList.remove('dragging');
        }
        this.draggedItem = null;
        
        // Remove all drag-over classes
        document.querySelectorAll('.pdf-item').forEach(item => {
            item.classList.remove('drag-over');
        });
    }

    handleItemDragOver(e) {
        if (!this.draggedItem) return;
        
        e.preventDefault();
        const target = e.target.closest('.pdf-item');
        if (target && target !== this.draggedItem) {
            target.classList.add('drag-over');
        }
    }

    handleItemDrop(e) {
        e.preventDefault();
        
        if (!this.draggedItem) return;
        
        const target = e.target.closest('.pdf-item');
        if (target && target !== this.draggedItem) {
            const draggedId = this.draggedItem.dataset.id;
            const targetId = target.dataset.id;
            
            this.reorderFiles(draggedId, targetId);
        }
        
        // Clean up drag states
        document.querySelectorAll('.pdf-item').forEach(item => {
            item.classList.remove('drag-over');
        });
    }

    reorderFiles(draggedId, targetId) {
        const draggedIndex = this.pdfFiles.findIndex(pdf => pdf.id == draggedId);
        const targetIndex = this.pdfFiles.findIndex(pdf => pdf.id == targetId);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
            // Remove the dragged item and insert it at the target position
            const [draggedFile] = this.pdfFiles.splice(draggedIndex, 1);
            this.pdfFiles.splice(targetIndex, 0, draggedFile);
            this.updateUI();
        }
    }

    async mergePDFs() {
        if (this.pdfFiles.length < 2) {
            this.showNotification('Please add at least 2 PDF files to merge', 'error');
            return;
        }

        this.showProgress();

        try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            
            for (let i = 0; i < this.pdfFiles.length; i++) {
                this.updateProgress((i / this.pdfFiles.length) * 100, `Processing ${this.pdfFiles[i].name}...`);
                
                const arrayBuffer = await this.pdfFiles[i].file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                const pageIndices = pdf.getPageIndices();
                
                const pages = await mergedPdf.copyPages(pdf, pageIndices);
                pages.forEach((page) => mergedPdf.addPage(page));
            }

            this.updateProgress(90, 'Finalizing merged PDF...');
            
            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            this.updateProgress(100, 'Download ready!');
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `merged-${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setTimeout(() => {
                this.hideProgress();
                this.showNotification('PDF merged successfully!', 'success');
            }, 1000);

        } catch (error) {
            console.error('Error merging PDFs:', error);
            this.hideProgress();
            this.showNotification('Error merging PDFs. Please try again.', 'error');
        }
    }

    showProgress() {
        document.getElementById('progressSection').style.display = 'block';
        document.getElementById('pdfListSection').style.display = 'none';
    }

    hideProgress() {
        document.getElementById('progressSection').style.display = 'none';
        document.getElementById('pdfListSection').style.display = 'block';
    }

    updateProgress(percentage, text) {
        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progressText').textContent = text;
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new StackFlowApp();
});

// Prevent default drag behaviors on the document
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());