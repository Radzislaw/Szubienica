// drawn passwords
var table_with_passwords = new Array(8);
table_with_passwords[0] = "Raz na wozie raz pod wozem";
table_with_passwords[1] = "Nie rób z igły widły";
table_with_passwords[2] = "czas to pieniądz";
table_with_passwords[3] = "dobra żona tym się chlubi że gotuje co mąż lubi";
table_with_passwords[4] = "dobrymi chęciami jest piekło zbudowane";
table_with_passwords[5] = "gdy się człowiek spieszy to się diabeł cieszy";
table_with_passwords[6] = "czego oko nie widzi tego sercu nie żal";
table_with_passwords[7] = "dla chcącego nic trudnego";
function draw()
{
var drawn_number = Math.round(Math.random() * table_with_passwords.length);
drawn_password = table_with_passwords[drawn_number];
}
draw();
var password = drawn_password;

password = password.toUpperCase();
var dlugosc = password.length;
var how_many_fails = 0;

// Audio
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var win = new Audio("win.mp3")
var lose = new Audio("lose.mp3")
var password1 = "";

// hide the password
for(i=0; i<dlugosc; i++)
{
    if(password.charAt(i)==" ") password1=password1 +" ";
    else password1 = password1 +"-";
}

function write_password()
{
    document.getElementById("board").innerHTML=password1;
}
window.onload = start;
// table of letters
var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";
//password function
function start()
{
    var content_div="";

    for(i=0; i<=34; i++)
    {
        var element= "lett"+i;
        content_div=content_div+'<div class="letter" onclick="check('+i+')"id="'+element+'">'+letters[i]+'</div>'
        if((i+1) % 7==0) content_div=content_div + '<div style="clear:both;"></div>'
    }
    document.getElementById("alfabet").innerHTML= content_div;

    write_password();
}
String.prototype.setthesign = function(position, sign)
{
    if(position> this.length-1)return this.toString();
    else return this.substr(0,position)+sign+this.substr(position+1);

}
//What is happening after click
function check(nr)
{
    var hit=false;
    for(i=0; i<dlugosc; i++)
    {
        if(password.charAt(i) == letters[nr])
        {
            password1 = password1.setthesign(i,letters[nr]);
            hit=true;
        }
    }
    if(hit==true)
    {
        //good letter
        yes.play();
        var element= "lett"+nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        write_password();
    }
    else
    {
        // bad letter
        no.play();
        var element= "lett"+nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");
        //fails
        how_many_fails++
        var obraz = "img/s"+ how_many_fails + ".jpg";
        document.getElementById("szubienica").innerHTML ='<img src="'+obraz+'" alt=""/>';
    }
    //win
    if(password== password1)
    {
    document.getElementById("alfabet").innerHTML = "BRAWO!!! Hasło poprawne:"+password+'<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span> '
    win.play();
    }
    //lose
    if(how_many_fails>=9)
    {
    document.getElementById("alfabet").innerHTML = "PRZEGRANA!! Hasło poprawne:"+password+'<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'
    lose.play();
    }
}

