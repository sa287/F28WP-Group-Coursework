package webGame;

import java.awt.Color;
import java.awt.Graphics;
import java.util.Random;

public class Player extends GameObject{
	
	Random r = new Random();

	public Player(int x, int y, ID id) {
		super(x, y, id);
		
		speedX = r.nextInt(5) + 1;
		speedY = r.nextInt(5) + 1;

	}

	public void tick() {
		x += speedX;
		y += speedY;
		
	}

	public void render(Graphics g) {
		g.setColor(Color.white);
		g.fillRect(x,  y,  32,  32);
		
		
	}

}
