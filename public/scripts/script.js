$("#top0").click(function()
{
    $("#first").removeClass("hide");
    $("#second").addClass("hide");
    $("#top0").addClass("active");
    $("#top1").removeClass("active");
});

$("#top1").click(function()
{
    $("#first").addClass("hide");
    $("#second").removeClass("hide");
    $("#top0").removeClass("active");
    $("#top1").addClass("active");
});