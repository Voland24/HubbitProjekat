import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {
  constructor(private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bubble) this.styleBubble();
  }

  ngAfterViewInit(): void {
    this.styleBubble();
  }

  styleBubble() {
    if (this.bubble.nativeElement.classList.contains('other-text'))
      this.renderer2.setStyle(
        this.bubble.nativeElement,
        'background-color',
        this.bubbleColor
      );
  }

  @Input() own: boolean | undefined = undefined;
  @Input() text: string | undefined = undefined;
  @Input() bubbleColor: string | undefined = undefined;

  @ViewChild('target') bubble!: ElementRef;

  ngOnInit(): void {}
}
