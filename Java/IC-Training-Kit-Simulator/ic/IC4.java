package ic;
import java.awt.*;
import java.awt.event.*;
public class IC4 extends Frame implements ActionListener {
    static Button[] gates=new Button[8];
    static Button[] p=new Button[15];
    static Button[] n=new Button[15];
    static Button[] f=new Button[15];
    static Label[] nf=new Label[15]; 
    static int[] on=new int[15];
    Font font=new Font("",Font.BOLD,15);
    
    public IC4() {
        setTitle("IC 4");
        setLocation(480,330);
        gates[1]=new Button("OR");
        gates[2]=new Button("AND");
        gates[3]=new Button("NOT");
        gates[4]=new Button("NOR");
        gates[5]=new Button("NAND");
        gates[6]=new Button("XOR");
        gates[7]=new Button("CLEAR");
        for(int i=1;i<=7;i++) {
            gates[i].addActionListener(this); 
            gateswhite(i);
        }
        for(int i=1;i<=14;i++) {
            p[i]=new Button("P");
            p[i].addActionListener(this);
            pwhite(i);
            n[i]=new Button("1");
            n[i].addActionListener(this);
            nwhite(i);
            f[i]=new Button("0");
            f[i].addActionListener(this);
            fwhite(i);
            nf[i]=new Label(String.valueOf(i));            
            yellow(i);
            on[i]=-1;
            nf[i].setFont(font);
        }
        for(int i=1;i<=7;i++) {
            p[i].setBounds(20,40+(i*30),20,20);
            n[i].setBounds(50,40+(i*30),20,20);
            f[i].setBounds(80,40+(i*30),20,20);
            nf[i].setBounds(110,40+(i*30),20,20);
        }
        for(int i=1;i<=7;i++)
            gates[i].setBounds(140,40+(i*30),50,20);
        for(int i=14;i>=8;i--) {
            nf[i].setBounds(200,40+((15-i)*30),20,20);
            n[i].setBounds(230,40+((15-i)*30),20,20);
            f[i].setBounds(260,40+((15-i)*30),20,20);
            p[i].setBounds(290,40+((15-i)*30),20,20);
        }
        for(int i=1;i<=7;i++)    
            add(gates[i]);
        for(int i=1;i<=14;i++)
        { add(p[i]);add(n[i]);add(f[i]);add(nf[i]); }
        setSize(330,320);
        setBackground(Color.BLACK);
        setLayout(null);
        setVisible(true);
        addWindowListener( new WindowAdapter() {
        public void windowClosing(WindowEvent we)
        { dispose(); }
        }); 
    }
    
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==n[7])
        { on[7]=1;
          nf[7].setText("G");
          blue(7); }
        else if(e.getSource()==f[7])
        { on[7]=0;
          nf[7].setText("7");
          red(7); }
        if(e.getSource()==n[14])
        { on[14]=1;
          nf[14].setText("V");
          blue(14); }
        else if(e.getSource()==f[14])
        { on[14]=0;
          nf[14].setText("14");
          red(14); }      
        
        if(on[7]==1 && on[14]==1) {
            for(int i=1;i<=6;i++) {
                if(e.getSource()==n[i])
                { on[i]=1;
                  blue(i); }
                else if(e.getSource()==f[i])
                { on[i]=0;
                  red(i); }
            }
            for(int i=8;i<=13;i++) {
                if(e.getSource()==n[i])
                { on[i]=1;
                  blue(i); }
                else if(e.getSource()==f[i])
                { on[i]=0;
                  red(i); }
            }
            
            for(int i=1;i<=14;i++)
                if(e.getSource()==p[i]) {
                    if(ic.IC3.x[0]==1)
                    { on[i]=1;
                      blue(i); }
                    else if(ic.IC3.x[0]==0)
                    { on[i]=0;
                      red(i); }
                }
            
            if(e.getSource()==gates[1]) {
                or(1,2,3);or(4,5,6);or(9,10,8);or(12,13,11); 
                gatescolor(1);
            }
            else if(e.getSource()==gates[2]) {
                and(1,2,3);and(4,5,6);and(9,10,8);and(12,13,11);
                gatescolor(2);
            }
            else if(e.getSource()==gates[3]) {
                not(1,2); not(3,4); not(5,6); not(9,8); not(11,10); not(13,12);
                gatescolor(3);
            }
            else if(e.getSource()==gates[4]) {
                nor(2,3,1);nor(5,6,4);nor(8,9,10);nor(11,12,13);
                gatescolor(4);
            }
            else if(e.getSource()==gates[5]) {
                nand(1,2,3);nand(4,5,6);nand(9,10,8);nand(12,13,11);
                gatescolor(5);
            }
            else if(e.getSource()==gates[6]) {
                xor(1,2,3);xor(4,5,6);xor(9,10,8);xor(12,13,11);
                gatescolor(6);
            }
        }
        
        if(e.getSource()==gates[7]) {
            for(int i=1;i<=14;i++)
            { on[i]=-1;
              yellow(i); } 
            for(int i=1;i<=7;i++)
                gateswhite(i);
        }   
    }
    
    static void or(int A,int B,int C) {
        if((on[A]|on[B])==1)
            onop(C);
        else if((on[A]|on[B])==0)
            offop(C);
    }
    static void and(int A,int B,int C) {
        if((on[A]&on[B])==1)
            onop(C);
        else if((on[A]&on[B])==0)
            offop(C);
    }
    static void not(int A,int B) {
        if(on[A]==0)
            onop(B);
        else if(on[A]==1)
            offop(B);
    }
    static void nor(int A,int B,int C) {
        if((on[A]|on[B])==0)
            onop(C);
        else if((on[A]|on[B])==1)
            offop(C);
    }
    static void nand(int A,int B,int C) {
        if((on[A]&on[B])==0)
            onop(C);
        else if((on[A]&on[B])==1)
            offop(C);
    }
    static void xor(int A,int B,int C) {
        if((on[A]!=on[B]) && (on[A]==1 || on[B]==1))
            onop(C);
        else if((on[A]==on[B]) && (on[A]==1 || on[A]==0))
            offop(C);
    }
    static void onop(int x) {
        on[x]=1;
        green(x);
    }
    static void offop(int x) {
        on[x]=0;
        red(x);
    }
    static void yellow(int x) {
        nf[x].setBackground(Color.YELLOW);
        nf[x].setForeground(Color.BLACK);
    }
    static void blue(int x) {
        nf[x].setBackground(Color.BLUE);
        nf[x].setForeground(Color.WHITE);
    }
    static void red(int x) {
        nf[x].setBackground(Color.RED);
        nf[x].setForeground(Color.WHITE);
    }
    static void green(int x) {
        nf[x].setBackground(Color.GREEN);
        nf[x].setForeground(Color.BLACK);
    }  
    static void gatescolor(int x) {
        for(int i=1;i<=7;i++)
            gateswhite(i);
        gatesblue(x);
    }
    static void gateswhite(int x) {
        gates[x].setBackground(Color.WHITE);
        gates[x].setForeground(Color.BLACK);
    }
    static void gatesblue(int x) {
        gates[x].setBackground(Color.BLUE);
        gates[x].setForeground(Color.BLACK);  
    } 
    static void pwhite(int x) {
        p[x].setBackground(Color.WHITE);
        p[x].setForeground(Color.BLACK);
    }
    static void nwhite(int x) {
        n[x].setBackground(Color.WHITE);
        n[x].setForeground(Color.BLACK);
    }
    static void fwhite(int x) {
        f[x].setBackground(Color.WHITE);
        f[x].setForeground(Color.BLACK);    
    }
}