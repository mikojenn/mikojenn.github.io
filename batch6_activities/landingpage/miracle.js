/*--------CAROUSEL-------*/
var counter = 1;
        setInterval(function(){
            document.getElementById('radio' + counter).checked = true;
            counter++;
            if(counter > 6){
                counter = 1;
            }
        }, 5000);

/*--------BANNER-------*/
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classlist.toggle("sticky", window.scrollY > 0);
})

/*-----submit button---*/
function clicked() {
            if (confirm('Do you want to submit?')) {
                yourformelement.submit();
            } else {
                return false;
            }
        }