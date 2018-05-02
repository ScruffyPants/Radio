import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { radioPlayerComponent } from '../radioPlayer/radioPlayer.component';

var x;

@Component({
  selector: 'audioBox',
  templateUrl: './audioBox.component.html',
  styleUrls: ['./audioBox.component.css']
})
export class audioBoxComponent implements OnInit {

  audio: number = 1;
  play: boolean = false;
  slider: boolean = false;
  @Input() channelTitle;
  @Input() listenURL;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (x) {
      x.pause();
      this.play = false;
    }
  }

  playAudio() {
      if (this.listenURL != '') {
        x = new Audio(this.listenURL);
        this.play = true;
        x.play();
      }
  }

  pauseAudio() {
      this.play = false;
      x.pause();
  }

  SetVolume() {
      x.volume = this.audio;
  }

  volSlider() {
    this.slider = !this.slider;
  }

}
