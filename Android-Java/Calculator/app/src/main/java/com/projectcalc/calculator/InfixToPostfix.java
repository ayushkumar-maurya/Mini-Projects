package com.projectcalc.calculator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

public class InfixToPostfix {
	private ArrayList<String> postfixExp;
	private static Stack<String> stack;
	private static HashMap<String, Integer> precedence;
	
	public InfixToPostfix() {
		precedence = new HashMap<String, Integer>();
		precedence.put("/", 1);
		precedence.put("*", 1);
		precedence.put("+", 0);
		precedence.put("-", 0);
	}

	public static boolean isNumeric(String str) {
		try {
			Double.parseDouble(str);
			return true;
		} catch(Exception e) {
			return false;
		}
	}

	public static boolean check_precedence(String op) {
		if(precedence.get(stack.peek()) >= precedence.get(op))
			return true;
		return false;
	}

	public ArrayList<String> infixToPostfix(ArrayList<String> infixExp) {
		stack = new Stack<String>();
		postfixExp = new ArrayList<String>();

		infixExp.add(")");
		stack.push("(");

		for(String str : infixExp) {

			if(str.equals("("))
				stack.push(str);

			else if(isNumeric(str))
				postfixExp.add(str);

			else if(str.equals(")")) {
				while(!stack.peek().equals("(")) {
					String popped = stack.pop();
					postfixExp.add(popped);
				}
				stack.pop();
			}
				
			else {
				while(!stack.peek().equals("(") && check_precedence(str)) {
					String popped = stack.pop();
					postfixExp.add(popped);
				}
				stack.push(str);
			}
		}
		return postfixExp;
	}

	public boolean isStackEmpty() {
		return stack.empty();
	}
}
