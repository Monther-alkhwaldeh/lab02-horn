'use strict'

let optionKey=[];
let uniqueOptionKey=[];
let arrayKeyword=[];

function GalleryHorn(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;
    arrayKeyword.push(this);

}


GalleryHorn.prototype.cloneRender = function () {

    let cloneTemp = $('.photo-template').clone();
    cloneTemp.find('h2').text(this.title);
    cloneTemp.find('img').attr('src', this.image_url);
    cloneTemp.find('p').text(this.description);
    cloneTemp.removeClass('photo-template');
    cloneTemp.attr('class', this.title);
    $('main').append(cloneTemp);
};


const ajaxSettings = {
    method: 'get',
    dataType: 'json',
};
$.ajax('page-1.json', ajaxSettings).then((data) => {
    data.forEach((horn) => {
        let hornObject = new GalleryHorn(horn);
        hornObject.cloneRender();
        optionKey.push(horn.keyword);
        
    });
    $.each(optionKey,function(i,value){
        if($.inArray(value,uniqueOptionKey) === -1) uniqueOptionKey.push(value);
    });
    uniqueOptionKey.forEach(function(value,i){
        $('select').append(`<option value ="${value}"> ${value} </option>`)

        $('select').on('change',function(){
            let keyName=this.options[this.selectedIndex].text;
            let newCloneTemp=$('.photo-template').clone();
            $('main').html("");
            $('main').append(newCloneTemp);
            arrayKeyword.forEach((function(value){
                if(keyName===value.keyword){
                    value.cloneRender();

                }
            }));
        });
    });
});

