function random_number(min,max) {

    return (Math.round((max-min) * Math.random() + min));
}

function create_array_of_random_number(min,max) {

    var temp, nums = new Array;

    for (var i=0; i<52; i++) {
        while((temp=number_found(random_number(min,max),nums))==-1);
        nums[i] = temp;
    }

    return (nums);
}

function number_found (random_number,number_array) {

    for (var element=0; element<number_array.length; element++) {

        if (random_number==number_array[element]) {
            return (-1);
	}
   }

    return (random_number);
}