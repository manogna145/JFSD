package com.klef.jfsd.sdp.model;

public class UserDietRetrival {
	
	private int fid;
    private String name;
    private float calories;
    private float fat;
    private float protein;
    private float carbohydrates;
    private int quantity;
    private String mealType;
	public int getFid() {
		return fid;
	}
	public void setFid(int fid) {
		this.fid = fid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getCalories() {
		return calories;
	}
	public void setCalories(float calories) {
		this.calories = calories;
	}
	public float getFat() {
		return fat;
	}
	public void setFat(float fat) {
		this.fat = fat;
	}
	public float getProtein() {
		return protein;
	}
	public void setProtein(float protein) {
		this.protein = protein;
	}
	public float getCarbohydrates() {
		return carbohydrates;
	}
	public void setCarbohydrates(float carbohydrates) {
		this.carbohydrates = carbohydrates;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getMealType() {
		return mealType;
	}
	public void setMealType(String mealType) {
		this.mealType = mealType;
	}

}
