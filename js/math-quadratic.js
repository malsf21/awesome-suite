function discriminate(A,B,C){
	return (B*B - 4*A*C);
}
function numRoots(A,B,C){
	if (discriminate(A,B,C) > 0){
		return 2;
	}
	else if (discriminate(A,B,C) == 0) {
		return 1;
	}
	else{
		return 0;
	}
}
function quadratic(A,B,C){
	if (numRoots(A,B,C) == 0){
		return "There are no real roots.";
	}
	else{
		var root1 = (-B + Math.sqrt(discriminate(A,B,C)))/(2*A);
		if (numRoots(A,B,C) == 1){
			return "The only root is " + root1;
		}
		else{
			var root2 = (-B - Math.sqrt(discriminate(A,B,C)))/(2*A);
			return "The two roots are " + root1 + " and " + root2;
		}
	}
}
