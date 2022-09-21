import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private ctx: CanvasRenderingContext2D | null = null;
  title = 'web-museum-front';


  private get height(): number {
    return this.ctx ? this.ctx.canvas.height : 0;
  }

  private get width(): number {
    return this.ctx ? this.ctx.canvas.width : 0;
  }

  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement> | null = null;


  ngOnInit(): void {
    this.ctx = this.canvas?.nativeElement.getContext('2d') || null;
    if (!this.ctx) {
      console.error('No Canvas Context Assigned');
    } else {
      this.ctx.canvas.width = window.screen.width | 300;
      this.ctx.canvas.height = window.screen.height | 300;
      this.generateBackground();
    }
  }


  public generateBackground(): void {
    this.generateSpace();
    this.generateStars();
  }

  generateSpace() {
    if (this.ctx) {
      let grd = this.ctx.createRadialGradient(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 90, this.ctx.canvas.width, this.ctx.canvas.height, this.width);
      if (grd) {
        grd.addColorStop(0, "#070318");
        grd.addColorStop(1, "#0f0093");
      }


      // Fill with gradient
      this.ctx.fillStyle = grd;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }

  generateStars() {
    console.log(this.height, this.width)
    Array(150).fill(0).map(() => {
      if (this.ctx)
        this.drawStar(this.ctx, this.getRandomInt(this.width), this.getRandomInt(this.height), 2, 'oldlace');
    });
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  private drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string, stroke?: string, strokeWidth?: number) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }
    if (stroke) {
      ctx.lineWidth = strokeWidth ? strokeWidth : 0;
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
  }


}
