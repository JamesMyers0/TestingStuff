/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class attractor{
	constructor(num, magnetism, radius, velocity, farColour, nearColour){
		this.num = num || 1000; //Number of dots
		this.magnetism = magnetism || 10; //Force on dots, allows negative values for a repulsive force
		this.radius = radius || 1; //Radius of each dot
		this.velocity = velocity || 0.95; //Global multiplier for velocity of all dots
		this.farColour = color(farColour || "#0000ff"); //Colour of dots far from mouse
		this.nearColour = color(nearColour || "#ffffff"); //Colour of dots near to mouse
		
		this.x = new Array(this.num); //each dot is stored as an index for the following arrays
		this.y = new Array(this.num); //x and y are current positions of each dot in respective planes
		this.vx = new Array(this.num); 
		this.vy = new Array(this.num); //vx and vy are velocities of dots in respective planes
		this.ax = new Array(this.num);
		this.ay = new Array(this.num); //ax and ay are acceleration of each dot in respective planes
		
		for(var i=0; i<this.num; i++){ //Arrays are populated with for loop. Dots are given a random position and start with no velocity/acceleration
			this.x[i] = random(width);
			this.y[i] = random(height);
			this.vx[i] = 0;
			this.vy[i] = 0;
			this.ax[i] = 0;
			this.ay[i] = 0;
		}
	}







	
	
	draw(){ //Function that is iteratively called by p5 script main draw function
		for(var i=0; i<this.num; i++){ //Does the following for each dot
			var distance = dist(mouseX, mouseY, this.x[i], this.y[i]); //Finds the distance between dot and mouse location
			
			if(distance > 3){ //If dot is too close to the mouse, acceleration is not updated																					
				this.ax[i] = this.magnetism * (mouseX - this.x[i]) / (distance * distance); //The acceleration is inversely proportional to the square of the distance from the center of gravity.
				this.ay[i] = this.magnetism * (mouseY - this.y[i]) / (distance * distance); 
			}
			
			this.vx[i] += this.ax[i]; //Increase both speeds by their acceleration
			this.vy[i] += this.ay[i]; 
    
			this.vx[i] = this.vx[i] * this.velocity; //Multiply by global velocity
			this.vy[i] = this.vy[i] * this.velocity;
    
			this.x[i] += this.vx[i]; //Move dot in both planes by respective new velocities
			this.y[i] += this.vy[i]; 
    
			var distColour = dist(0,0,this.vx[i],this.vy[i]); //Used to colour each dot correctly. //Distcolour contains distance from (0,0) to dot position			
			var fillColour = lerpColor(this.farColour, this.nearColour, distColour/5); //lerpColor combines the colour of the two inputs. distColour is converted to a fraction and used to decide colour
			fillColour.setAlpha(32);
			
			fill(fillColour); 
			ellipse(this.x[i],this.y[i],this.radius,this.radius); //finally, the dot is drawn at its position
		}
  
	}
}

