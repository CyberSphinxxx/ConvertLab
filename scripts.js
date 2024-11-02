// script.js
document.addEventListener('DOMContentLoaded', function() {
    const dropzone = document.getElementById('dropzone');
    const conversionList = document.getElementById('conversion-list');
    const convertBtn = document.getElementById('convert-btn');
    const themeToggle = document.getElementById('theme-toggle');
    
    let files = [];

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Drag and Drop
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.backgroundColor = 'var(--secondary)';
    });

    dropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropzone.style.backgroundColor = 'transparent';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.backgroundColor = 'transparent';
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    });

    dropzone.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*,video/*,audio/*';
        input.onchange = (e) => handleFiles(Array.from(e.target.files));
        input.click();
    });

    function handleFiles(newFiles) {
        files = [...files, ...newFiles];
        updateFileList();
        convertBtn.style.display = 'inline-block';
    }

    function updateFileList() {
        conversionList.innerHTML = '';
        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileType = file.type.split('/')[0];
            const icon = getFileIcon(fileType);
            
            fileItem.innerHTML = ` <div class="file-info">
                    <i class="${icon}"></i>
                    <span>${file.name}</span>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            
            conversionList.appendChild(fileItem);
        });
    }

    function getFileIcon(type) {
        switch (type) {
            case 'image':
                return 'fas fa-file-image';
            case 'video':
                return 'fas fa-file-video';
            case 'audio':
                return 'fas fa-file-audio';
            default:
                return 'fas fa-file';
        }
    }

    conversionList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            files.splice(index, 1);
            updateFileList();
            if (files.length === 0) {
                convertBtn.style.display = 'none';
            }
        }
    });

    convertBtn.addEventListener('click', () => {
        // Add conversion logic here
        console.log('Convert button clicked');
    });
});