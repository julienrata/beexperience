import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

export interface CardData {
  id: string | number;
  title: string;
  content: string;
  imageSrc?: string;
  date?: Date;
  tags?: string[];
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() data!: CardData;
  @Input() variant: 'default' | 'compact' | 'featured' = 'default';
  @Input() loading = false;

  @Output() cardClick = new EventEmitter<CardData>();
  @Output() editClick = new EventEmitter<CardData>();
  @Output() deleteClick = new EventEmitter<CardData>();

  onCardClick(): void {
    this.cardClick.emit(this.data);
  }

  onEditClick(event: Event): void {
    event.stopPropagation();
    this.editClick.emit(this.data);
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(this.data);
  }
}
