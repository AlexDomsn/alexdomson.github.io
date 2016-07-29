/**
 * Created by AlexD on 29.07.2016.
 */
li(".portpholio li").click(function() {
        li(".portpholio li").removeClass("active");
        li(this).addClass("active");
});