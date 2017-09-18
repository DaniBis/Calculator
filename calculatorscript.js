var op = new Array();
var nr = new Array('');
var button_check=-1;
var first_position=0;
var ctpriority=0;
var ctnonpriority=0;

function input_write(){
	$('.btn').on('click',function(e){
		e.preventDefault();

		var button_value = $(this).val();
		var input_value = $('#input_expresion').val();

			if(isNaN(button_value)){
				if(first_position===0){
					if(button_value==='-'){
						convert_button_value = button_value.toString();
						nr[nr.length-1]=convert_button_value;
						$('#input_expresion').val(input_value + button_value);
						first_position=1;
					}
				}
				else{ 
					if(button_check!=1){	
						if(button_value==='*' || button_value==='/'){
							ctpriority++;
						}	
						else{
							ctnonpriority++;
						}
						button_check=1;
						op.push(button_value);
						nr.push('');
						$('#input_expresion').val(input_value + button_value);
					}
				}
			}
			else{
				first_position=1;
				button_check=0;
				convert_button_value = button_value.toString();
				convert_numar_value = nr[nr.length-1].toString();
				nr[nr.length-1] = parseInt(convert_numar_value + convert_button_value);
				$('#input_expresion').val(input_value + button_value);
			}
    });	
}

function add(num1,num2){
	return num1+num2;
}

function minus(num1,num2){
	return num1-num2;
}

function divide(num1,num2){
	return num1/num2;
}

function mul(num1,num2){
	return num1*num2;
}

function calculate(){
		$('.egal').on('click',function(f){
			f.preventDefault();
			var res=0;
				while(op.length!==0){
					for(var i=0;i<op.length;i++){	
						if(ctpriority>0){
							if(op[i]==='*' || op[i]==='/'){
								var operand_value=op[i];								
									switch (operand_value){
									    case '/':
									      	res=divide(nr[i],nr[i+1]);
									        break;
									    case '*':
									       	res=mul(nr[i],nr[i+1]);
									        break;
									}	

										nr[i+1]=res;	
										op.splice(i,1);
										nr.splice(i,1);	
										i--;
										ctpriority--;
							}
						}
						else{						
							if(ctnonpriority>0){
								if(op[i]==='+' || op[i]==='-'){
									var operand_value=op[i];
										switch (operand_value){
										    case '+':
										       	res=add(nr[i],nr[i+1]);
										        break;
										    case '-':
										       	res=minus(nr[i],nr[i+1]);
										        break;
										}	

											nr[i+1]=res;	
											op.splice(i,1);
											nr.splice(i,1);	
											i--;
											ctnonpriority--;
								}
							}	
						}	
					}
				}
			$('#input_result').val(res);
		});
	}

$(document).ready(function(){	
	input_write();	
	calculate();
});





