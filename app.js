'use strict'

let optionKey=[];
let uniqueOptionKey=[];
let arrayKeyword=[];
let arrayKeyword2=[];
let optionKey2=[];
let uniqueOptionKey2=[];


function GalleryHorn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  arrayKeyword.push(this);

}

function GalleryHorn2(horn2) {
  this.image_url = horn2.image_url;
  this.title = horn2.title;
  this.description = horn2.description;
  this.keyword = horn2.keyword;
  this.horns = horn2.horns;
  arrayKeyword2.push(this);

}

GalleryHorn.prototype.cloneRender = function () {

  let template2=$('#template2').html();
  $('#main1').append(Mustache.render(template2,this));
};

GalleryHorn2.prototype.cloneRender2 = function () {

  let template2=$('#template2').html();
  $('#main2').append(Mustache.render(template2,this));
};
// ---------------------------------------------------------------

GalleryHorn.ajaxsett1 = () => {
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

      $('#select1').append(`<option value ="${value}"> ${value} </option>`)
      $('#select1').on('change',function(){
        let keyName=this.options[this.selectedIndex].text;
        $('#main1').html('');
        arrayKeyword.forEach((function(value){
          if(keyName===value.keyword){
            value.cloneRender();
          }
        }));
      });
    });
  });
};

GalleryHorn2.ajaxsett2 = () => {
  const ajaxSettings2 = {
    method: 'get',
    dataType: 'json',
  };
  $.ajax('page-2.json', ajaxSettings2).then((data) => {
    data.forEach((horn2) => {
      let Ghorn2 = new GalleryHorn2(horn2);
      Ghorn2.cloneRender2();
      optionKey2.push(horn2.keyword);

    });
    $.each(optionKey2,function(i,value){
      if($.inArray(value,uniqueOptionKey2) === -1) uniqueOptionKey2.push(value);
    });
    console.log(uniqueOptionKey2);

    uniqueOptionKey2.forEach(function(value,i){

      $('#select2').append(`<option value ="${value}"> ${value} </option>`)
      $('#select2').on('change',function(){
        let keyName2=this.options[this.selectedIndex].text;
        // let newCloneTemp=$('.photo-template2').html();
        $('#main2').html('');
        arrayKeyword2.forEach((function(value){
          if(keyName2===value.keyword){
            value.cloneRender2();
          }
        }));
      });
    });
  });

};

let page='page1';
$('#select2').hide();

$(document).ready(function(){
  $('#page1').on('click',function(){
    $('#main1').html();
    $('#main1').show();
    $('#main2').hide();
    $('#main2').empty();
    $('#select1').find('option').remove();
    $('#select1').show();
    $('#select2').hide();

    GalleryHorn.ajaxsett1();
    page='page1';

  })
});

$(document).ready(function(){
  $('#page2').on('click',function(){
    $('#main2').html();
    $('#main2').show();
    $('#main1').hide();
    $('#main2').empty();
    $('#select2').find('option').remove();
    $('#select2').show();
    $('#select2').hide();
    page='page2';

    GalleryHorn2.ajaxsett2();
  })
});

$(document).ready(function(){
  $('#title').change(function(){
    sortByTitle();

  });

});

$(document).ready(function(){
  $('#horns').change(function(){
    sortByHorn();

  });

});

let sortByTitle = () =>{
  if(page==='page1'){
    arrayKeyword.sort(function (a,b){
      if (a.title > b.title) return 1;
      if (b.title > a.title) return -1;
      return 0;
    });
    $('#main1').html('');
   
    arrayKeyword.forEach(function(value){
      value.cloneRender();

    });

  }

  if(page==='page2'){
    arrayKeyword2.sort(function (a,b){
      if (a.title > b.title) return 1;
      if (b.title > a.title) return -1;
      return 0;
    });

    $('#main2').html('');
    arrayKeyword2.forEach(function(value){
      value.cloneRender2();

    });
  }
}

let sortByHorn = () =>{
  if(page==='page1'){
    arrayKeyword.sort(function (a,b){
      if (a.horns > b.horns) return 1;
      if (b.horns > a.horns) return -1;
      return 0;
    });
    $('#main1').html('');
    arrayKeyword.forEach(function(value){
      value.cloneRender();

    });

  }
  if(page==='page2'){
    arrayKeyword2.sort(function (a,b){
      if (a.horns > b.horns) return 1;
      if (b.horns > a.horns) return -1;
      return 0;
    });

    $('#main2').html('');

    arrayKeyword2.forEach(function(value){
      value.cloneRender2();

    });
  }
}


GalleryHorn.ajaxsett1();



