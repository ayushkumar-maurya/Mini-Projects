//Real Time Digital Clock using Seven Segments

#include<graphics.h>
#include<time.h>
#include<dos.h>

int x[7][7]={
{20, 25, 65, 70, 65, 25, 20},
{70, 75, 75, 70, 65, 65, 70},
{70, 75, 75, 70, 65, 65, 70},
{20, 25, 65, 70, 65, 25, 20},
{20, 25, 25, 20, 15, 15, 20},
{20, 25, 25, 20, 15, 15, 20},
{20, 25, 65, 70, 65, 25, 20}
};

int y[7][7]={
{100, 95, 95, 100, 105, 105, 100},
{100, 105, 145, 150, 145, 105, 100},
{150, 155, 195, 200, 195, 155, 150},
{200, 195, 195, 200, 205, 205, 200},
{150, 155, 195, 200, 195, 155, 150},
{100, 105, 145, 150, 145, 105, 100},
{150, 145, 145, 150, 155, 155, 150}
};

int num[10][7]={
{1,1,1,1,1,1,0},
{0,1,1,0,0,0,0},
{1,1,0,1,1,0,1},
{1,1,1,1,0,0,1},
{0,1,1,0,0,1,1},
{1,0,1,1,0,1,1},
{1,0,1,1,1,1,1},
{1,1,1,0,0,0,0},
{1,1,1,1,1,1,1},
{1,1,1,1,0,1,1}
};

void clk();
void display(int,int);

void main()
{
	int gd=DETECT,gm;
	initgraph(&gd,&gm,"C:\\TURBOC3\\BGI");
	clk();
	getch();
	closegraph();
}

void clk()
{
	int hr,min,sec,h=0,m=0,s=0;
	time_t rawtime;
    struct tm * timeinfo;
	time(&rawtime);
    timeinfo=localtime(&rawtime);
	hr=timeinfo->tm_hour;
	min=timeinfo->tm_min;
	sec=timeinfo->tm_sec;
	while(1)
	{
		if(h==24 && m==60 && s==60)
			hr=0;
		for(h=hr;h<=23;h++)
		{
			if(m==60 && s==60)
				min=0;
			for(m=min;m<=59;m++)
			{
				if(s==60)
					sec=0;
				for(s=sec;s<=59;s++)
				{
					display(h%10,2);
					display((h/10)%10,1);
					display(m%10,4);
					display((m/10)%10,3);
					display(s%10,6);
					display((s/10)%10,5);
					delay(1000);
					cleardevice();
				}
			}
		}
	}
}

void display(int n, int c)
{
	int hrt[7][14],hru[7][14],mint[7][14],minu[7][14],sect[7][14],secu[7][14];
	int inc[6]={0,70,160,230,320,390};
	int i,j,k;
	for(i=0;i<7;i++)
	{
		for(j=0,k=0;j<14;j+=2,k++)
		{
			hrt[i][j]=x[i][k]+inc[0];
			hru[i][j]=x[i][k]+inc[1];
			mint[i][j]=x[i][k]+inc[2];
			minu[i][j]=x[i][k]+inc[3];
			sect[i][j]=x[i][k]+inc[4];
			secu[i][j]=x[i][k]+inc[5];
		}
		for(j=1,k=0;j<14;j+=2,k++)
		{
			hrt[i][j]=y[i][k];
			hru[i][j]=y[i][k];
			mint[i][j]=y[i][k];
			minu[i][j]=y[i][k];
			sect[i][j]=y[i][k];
			secu[i][j]=y[i][k];
		}
	}
	setcolor(RED);
	setfillstyle(1,RED);
	for(i=0;i<7;i++)
	{
		if(num[n][i]==1 && c==1)
			fillpoly(7,hrt[i]);
		if(num[n][i]==1 && c==2)
			fillpoly(7,hru[i]);
		if(num[n][i]==1 && c==3)
			fillpoly(7,mint[i]);
		if(num[n][i]==1 && c==4)
			fillpoly(7,minu[i]);
		if(num[n][i]==1 && c==5)
			fillpoly(7,sect[i]);
		if(num[n][i]==1 && c==6)
			fillpoly(7,secu[i]);
	}
	rectangle(155,130,165,140);
	floodfill(160,135,RED);
	rectangle(155,160,165,170);
	floodfill(160,165,RED);
	rectangle(315,130,325,140);
	floodfill(320,135,RED);
	rectangle(315,160,325,170);
	floodfill(320,165,RED);
}
