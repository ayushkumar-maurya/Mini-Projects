//IC Training Kit Simulator

import ic.*;
import java.awt.*;
import java.awt.event.*;
public class Simulator extends Frame implements ActionListener {
    Button[] ic=new Button[5];
    Font font=new Font("",Font.BOLD,15);
    public static void main(String[] args) {
        new Simulator();
    }  
    public Simulator() {
        setTitle("IC Training Kit Simulator");
        setLocation(0,0);
        for(int i=1;i<=4;i++) {
            ic[i]=new Button("IC "+String.valueOf(i));
            ic[i].addActionListener(this);
            ic[i].setBackground(Color.RED);
            ic[i].setForeground(Color.WHITE);
            ic[i].setFont(font);
            ic[i].setBounds(50,40+(i*30),50,20);
            add(ic[i]);
        }
        setSize(150,230);
        setBackground(Color.BLACK);
        setLayout(null);
        setVisible(true);
        addWindowListener( new WindowAdapter() {
            public void windowClosing(WindowEvent we)
            { System.exit(0); }
        }); 
    }
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==ic[1])
            new IC1();
        else if(e.getSource()==ic[2])
            new IC2();
        else if(e.getSource()==ic[3])
            new IC3();
        else if(e.getSource()==ic[4])
            new IC4();
    }
}