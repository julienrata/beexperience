import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';

export interface FileUploadEvent {
  files: File[];
  rejectedFiles?: File[];
}

@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css',
})
export class DropzoneComponent {
  @Input() multiple = false;
  @Input() accept = '*/*';
  @Input() maxFileSize = 5; // in MB
  @Input() maxFiles = 10;
  @Input() label = 'Drag and drop files here, or click to select files';
  @Input() sublabel = 'Supported file types: JPG, PNG, PDF';
  @Input() height = 'h-64';
  @Input() uploadButtonLabel = 'Upload';
  @Input() showUploadButton = true;
  @Input() previewImages = true;

  @Output() filesChanged = new EventEmitter<FileUploadEvent>();
  @Output() uploadClicked = new EventEmitter<File[]>();

  isDragging = false;
  selectedFiles: File[] = [];
  rejectedFiles: { file: File; reason: string }[] = [];

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileInputChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.handleFiles(fileInput.files);
    }
  }

  handleFiles(fileList: FileList): void {
    const newValidFiles: File[] = [];
    const newRejectedFiles: { file: File; reason: string }[] = [];

    // Convert FileList to array for easier processing
    const files = Array.from(fileList);

    // Check max files limit
    if (!this.multiple && files.length > 1) {
      // If multiple is false, only take the first file
      files.splice(1);
    } else if (
      this.multiple &&
      this.selectedFiles.length + files.length > this.maxFiles
    ) {
      // If multiple is true, check the max files limit
      const remainingSlots = Math.max(
        0,
        this.maxFiles - this.selectedFiles.length
      );
      files.splice(remainingSlots);

      // Add rejected files for max limit
      files.slice(remainingSlots).forEach((file) => {
        newRejectedFiles.push({
          file,
          reason: `Max files limit (${this.maxFiles}) exceeded`,
        });
      });
    }

    // Process remaining files
    for (const file of files) {
      // Check file type
      if (!this.isFileTypeAccepted(file)) {
        newRejectedFiles.push({ file, reason: 'File type not accepted' });
        continue;
      }

      // Check file size
      if (file.size > this.maxFileSize * 1024 * 1024) {
        newRejectedFiles.push({
          file,
          reason: `File size exceeds ${this.maxFileSize}MB limit`,
        });
        continue;
      }

      newValidFiles.push(file);
    }

    // Update selected files
    if (this.multiple) {
      this.selectedFiles = [...this.selectedFiles, ...newValidFiles];
    } else {
      this.selectedFiles = newValidFiles;
    }

    // Update rejected files
    this.rejectedFiles = [...this.rejectedFiles, ...newRejectedFiles];

    // Emit event
    this.filesChanged.emit({
      files: this.selectedFiles,
      rejectedFiles: newRejectedFiles.map((rf) => rf.file),
    });
  }

  isFileTypeAccepted(file: File): boolean {
    if (this.accept === '*/*') {
      return true;
    }

    const fileType = file.type;
    const acceptedTypes = this.accept.split(',').map((type) => type.trim());

    for (const type of acceptedTypes) {
      // Check for wildcard types like 'image/*'
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        if (fileType.startsWith(category + '/')) {
          return true;
        }
      }
      // Check for specific types
      else if (type === fileType) {
        return true;
      }
      // Check for extensions like '.jpg'
      else if (type.startsWith('.')) {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (extension === type.toLowerCase()) {
          return true;
        }
      }
    }

    return false;
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filesChanged.emit({ files: this.selectedFiles });
  }

  removeRejectedFile(index: number): void {
    this.rejectedFiles.splice(index, 1);
  }

  uploadFiles(): void {
    this.uploadClicked.emit(this.selectedFiles);
  }

  // Helper method to get file type icon or preview image
  getFilePreview(file: File): string {
    if (this.previewImages && file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }

    // Return icon based on file type
    if (file.type.startsWith('image/')) {
      return 'image';
    } else if (file.type.startsWith('video/')) {
      return 'video';
    } else if (file.type.startsWith('audio/')) {
      return 'audio';
    } else if (file.type.includes('pdf')) {
      return 'pdf';
    } else if (
      file.type.includes('word') ||
      file.name.endsWith('.docx') ||
      file.name.endsWith('.doc')
    ) {
      return 'word';
    } else if (
      file.type.includes('excel') ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')
    ) {
      return 'excel';
    } else if (
      file.type.includes('powerpoint') ||
      file.name.endsWith('.pptx') ||
      file.name.endsWith('.ppt')
    ) {
      return 'powerpoint';
    } else {
      return 'file';
    }
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  clearAll(): void {
    this.selectedFiles = [];
    this.rejectedFiles = [];
    this.filesChanged.emit({ files: [] });
  }
}
