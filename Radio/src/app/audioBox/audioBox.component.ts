import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
      x = new Audio("../../assets/csitaly.mp3");
  }

  playAudio() {
      this.play = true;
      x.play();
  }

  pauseAudio() {
      this.play = false;
      x.pause();
  }

  SetVolume() {
      console.log(this.audio);
      x.volume = this.audio;
  }

  volSlider() {
    this.slider = !this.slider;
  }

}
