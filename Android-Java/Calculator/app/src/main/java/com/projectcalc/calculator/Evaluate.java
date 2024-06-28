package com.projectcalc.calculator;

import java.util.ArrayList;
import java.util.Stack;

public class Evaluate {
	private ArrayList<String> infixExp;
	private ArrayList<String> postfixExp;
	private InfixToPostfix conv;
	private Stack<String> stack;

	public static boolean isNumeric(String str) {
		try {
			Double.parseDouble(str);
			return true;
		} catch(Exception e) {
			return false;
		}
	}

	public void getPostfixExp(String strExp) {
		infixExp = new ArrayList<String>();
		
		String str;
		int i = 0;
		while(i < strExp.length()) {
			str = String.valueOf(strExp.charAt(i++));
			if(isNumeric(str))
				while(i < strExp.length() && (isNumeric(String.valueOf(strExp.charAt(i))) || strExp.charAt(i) == '.'))
					str += strExp.charAt(i++);
			infixExp.add(str);
		}

		conv = new InfixToPostfix();
		postfixExp = conv.infixToPostfix(infixExp);
	}
	
	public Double evalPostfixExp() {
		stack = new Stack<String>();

		for(String str : postfixExp) {
			if(isNumeric(str))
				stack.push(str);

			else {
				Double op2 = Double.parseDouble(stack.pop());
				Double op1 = Double.parseDouble(stack.pop());
				Double res = 0.0;
				switch(str) {
					case "/":
						res = op1 / op2;
						break;
					case "*":
						res = op1 * op2;
						break;
					case "+":
						res = op1 + op2;
						break;
					case "-":
						res = op1 - op2;
						break;
				}
				stack.push(String.valueOf(res));
			}
		}
		return Double.parseDouble(stack.peek());
	}

	public boolean isStackEmpty() {
		stack.pop();
		return (stack.empty() && conv.isStackEmpty());
	}
}
