function getData(){
    $("#data").load("https://rickandmortyapi.com/api/character",
        function(data,status,xhr){});
    }