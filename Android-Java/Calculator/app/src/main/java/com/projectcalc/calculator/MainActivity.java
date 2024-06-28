package com.projectcalc.calculator;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private EditText exp;
    private TextView ans;
    private Button[] buttons;
    private Button result;
    private Button clear;
    private Button all_clear;
    private static Evaluate eval;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        exp = findViewById(R.id.exp);
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            exp.setShowSoftInputOnFocus(false);
        } else {
            exp.setTextIsSelectable(true);
        }

        ans = findViewById(R.id.ans);
        buttons = new Button[]{
                findViewById(R.id.zero),
                findViewById(R.id.one),
                findViewById(R.id.two),
                findViewById(R.id.three),
                findViewById(R.id.four),
                findViewById(R.id.five),
                findViewById(R.id.six),
                findViewById(R.id.seven),
                findViewById(R.id.eight),
                findViewById(R.id.nine),
                findViewById(R.id.point),
                findViewById(R.id.sbracket),
                findViewById(R.id.ebracket),
                findViewById(R.id.divide),
                findViewById(R.id.multiply),
                findViewById(R.id.add),
                findViewById(R.id.subtract)
        };
        result = findViewById(R.id.result);
        clear = findViewById(R.id.clear);
        all_clear = findViewById(R.id.all_clear);
        eval = new Evaluate();

        for(Button btn : buttons) {
            btn.setOnClickListener(v -> {
                int cursorPos = exp.getSelectionEnd();
                String old_exp = exp.getText().toString();
                String new_exp = old_exp.substring(0, cursorPos) + btn.getText().toString() + old_exp.substring(cursorPos);
                exp.setText(new_exp);
                exp.setSelection(++cursorPos);
                String result = calculateAns(new_exp);
                if(result != null) {
                    ans.setTextColor(Color.parseColor("#777777"));
                    ans.setText(result);
                }
                else
                    ans.setText("");
            });
        }

        result.setOnClickListener(v -> {
            String new_exp = exp.getText().toString();
            String result = calculateAns(new_exp);
            if(result != null) {
                exp.setText(result);
                ans.setText("");
            }
            else {
                ans.setTextColor(Color.parseColor("#FF9696"));
                ans.setText("Invalid Expression");
                exp.setText("");
            }
        });

        clear.setOnClickListener(v -> {
            int cursorPos = exp.getSelectionEnd();
            String old_exp = exp.getText().toString();
            String result;
            if(cursorPos != 0) {
                String new_exp = old_exp.substring(0, cursorPos-1) + old_exp.substring(cursorPos);
                exp.setText(new_exp);
                exp.setSelection(--cursorPos);
                result = calculateAns(new_exp);
            }
            else
                result = calculateAns(old_exp);

            if(result != null) {
                ans.setTextColor(Color.parseColor("#777777"));
                ans.setText(result);
            }
            else
                ans.setText("");
        });

        all_clear.setOnClickListener(v -> {
            exp.setText("");
            ans.setText("");
        });
    }

    public static String calculateAns(String strExp) {
        try {
            eval.getPostfixExp(strExp);
            Double res = eval.evalPostfixExp();
            if(eval.isStackEmpty()) {
                if(res - res.intValue() == 0)
                    return String.valueOf(res.intValue());
                return String.valueOf(res);
            }
            return null;
        } catch(Exception e) {
            return null;
        }
    }
}