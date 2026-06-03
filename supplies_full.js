//初期状態、変数
var brand = "toyota";
var status_no = ['1'];
var vowel = "a";
var model_status = ['1'];
var brand_status = [];
var carName = "";
var carNameJP = "";
var carStatus = "";
var rootDir = getRootDir();

var windowWidth = window.innerWidth;
$(window).resize(function() 
{
    windowWidth = window.innerWidth;
    // console.log(windowWidth);
});

cars_json_output(brand,status_no,vowel);
// console.log(windowWidth);

$(document).ready(function() {
    var $element = $('.slidein_menu')
    var showPosition = 120;
    $(window).scroll(function() {
        checkScroll();
    })
    checkScroll();
    function checkScroll() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > showPosition) {
            $element.css({
                'top': '0'
            });
        } else {
            $element.css({
                'top': '-120px' // 要素の高さに応じて調整
            });
        }
    }
})

$('#menu_search_button').on('click', function() {
    const input = $('.search_input').find('input').val();
    $('#word').val(input);
    $('#search_highlight').trigger('click');
})



//JSONから出力
function cars_json_output(b,s,v) {
    const timestamp = new Date().getTime();
    const url = `./../CAWeb_Data/data/cars.json?v=${timestamp}`;

    $.ajax({
        url,
        dataType: "json",
    })

    .done(function(response) {
        // console.log(b);
        // console.log(s);
        // console.log(v);

        if(windowWidth > 980){
            // console.log("a");

            if(b == "toyota"){
                $('.jp-xa').empty();
                $('.jp-xi').empty();
                $('.jp-xu').empty();
                $('.jp-xe').empty();
                $('.jp-xo').empty();

                for (key in response) {
                    if (key.indexOf(b) === 0) { 
                        // console.log("ok");
                            //先頭行挿入
                            if(v == "a"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">ア</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">イ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ウ</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">エ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">オ</div>');    
                            }
                            if(v == "k"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">カ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">キ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ク</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">ケ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">コ</div>');    
                            }
                            if(v == "s"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">サ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">シ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ス</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">セ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">ソ</div>');    
                            }
                            if(v == "t"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">タ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">チ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ツ</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">テ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">ト</div>');    
                            }
                            if(v == "n"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">ナ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">二</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ヌ</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">ネ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">ノ</div>');    
                            }
                            if(v == "h"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">ハ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">ヒ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">フ</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">へ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">ホ</div>');    
                            }
                            if(v == "m"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">マ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">ミ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ム</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">メ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">モ</div>');    
                            }
                            if(v == "y"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">ヤ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;"></div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ユ</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;"></div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">ヨ</div>');    
                            }
                            if(v == "r"){
                                $('.jp-xa').append('<div class="midasi" style="background-color: #f2f2f2;">ラ</div>');
                                $('.jp-xi').append('<div class="midasi" style="background-color: #f2f2f2;">リ</div>');
                                $('.jp-xu').append('<div class="midasi" style="background-color: #f2f2f2;">ル</div>');
                                $('.jp-xe').append('<div class="midasi" style="background-color: #f2f2f2;">レ</div>');
                                $('.jp-xo').append('<div class="midasi" style="background-color: #f2f2f2;">ロ</div>');    
                            }
                        response[key].forEach((elem, index) => {

                            //ステータス判定
                            var result1 = s.includes('1');
                            var result0 = s.includes('0');

                            var p = 99;
                            if(result1 == true && result0 == false){p = 1;}
                            if(result1 == false && result0 == true){p = 0;}
                            if(result1 == true && result0 == true){p = 2;}
                            if(p == 99){return;}
                            if(p == 1){
                                if(elem['status'] != 1){return;}
                            }
                            if(p == 0){
                                if(elem['status'] != 0){return;}
                            }
                            if(v == 'a'){
                                if(elem['consonant'] != 'a' && elem['consonant'] != 'i' && elem['consonant'] != 'u' && elem['consonant'] != 'e' && elem['consonant'] != 'o'){return;}
                            } else {
                            //母音判定
                                if(elem['consonant'] != v){return;}
                            }

                            if(elem['vowel'] == 'a'){
                                $('.jp-xa').append('<div data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');
                            }
                            if(elem['vowel'] == 'i'){
                                $('.jp-xi').append('<div data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');
                            }
                            if(elem['vowel'] == 'u'){
                                $('.jp-xu').append('<div data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');
                            }
                            if(elem['vowel'] == 'e'){
                                $('.jp-xe').append('<div data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');
                            }
                            if(elem['vowel'] == 'o'){
                                $('.jp-xo').append('<div data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');
                            }
                        });
                    }
                }
            }

        } 

        if(b == "lexus"){
            $('.lexus-category').empty();
            for (key in response) {
                if (key.indexOf(b) === 0) { 
                    response[key].forEach((elem, index) => {

                        //ステータス判定
                        var result1 = s.includes('1');
                        var result0 = s.includes('0');

                        var p = 99;
                        if(result1 == true && result0 == false){p = 1;}
                        if(result1 == false && result0 == true){p = 0;}
                        if(result1 == true && result0 == true){p = 2;}
                        if(p == 99){return;}
                        if(p == 1){
                            if(elem['status'] != 1){return;}
                        }
                        if(p == 0){
                            if(elem['status'] != 0){return;}
                        }

                        $('.lexus-category').append('<div class="l_sell" data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');

                    });
                }
            }


        }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("ajax通信：失敗");

        console.log("jqXHR       : " + jqXHR.status); // HTTPステータス取得
        console.log("textStatus  : " + textStatus); // タイムアウト、パースエラー
        console.log("errorThrown : " + errorThrown.message); // 例外情報
    })
}

function cars_json_output_sp(b,s,v) {
    const timestamp = new Date().getTime();
    const url = `./../CAWeb_Data/data/cars.json?v=${timestamp}`;

    $.ajax({
        url,
        dataType: "json",
    })

    .done(function(response) {

            if(b == "toyota"){
                $('.sjp-aa').empty();
                $('.sjp-ka').empty();
                $('.sjp-sa').empty();
                $('.sjp-ta').empty();
                $('.sjp-na').empty();
                $('.sjp-ha').empty();
                $('.sjp-ma').empty();
                $('.sjp-ya').empty();
                $('.sjp-ra').empty();


                for (key in response) {
                    if (key.indexOf(b) === 0) { 
                        response[key].forEach((elem, index) => {

                            //ステータス判定
                            var result1 = s.includes('1');
                            var result0 = s.includes('0');

                            var p = 99;
                            if(result1 == true && result0 == false){p = 1;}
                            if(result1 == false && result0 == true){p = 0;}
                            if(result1 == true && result0 == true){p = 2;}
                            if(p == 99){return;}
                            if(p == 1){
                                if(elem['status'] != 1){return;}
                            }
                            if(p == 0){
                                if(elem['status'] != 0){return;}
                            }
                            // console.log(v);
                            if(v == 'a'){
                                if(elem['consonant'] != 'a' && elem['consonant'] != 'i' && elem['consonant'] != 'u' && elem['consonant'] != 'e' && elem['consonant'] != 'o'){return;}
                            } else {
                            //母音判定
                                if(elem['consonant'] != v){return;}
                            }
                                $('.sjp-' + v + 'a').append('<li data-car-name="'+ elem['name'] +'" data-status="'+ elem['status'] +'">' + elem['jpName'] + '</li>');
                        });
                    }
                }
            }

        if(b == "lexus"){
            $('.lexus-category').empty();
            for (key in response) {
                if (key.indexOf(b) === 0) { 
                    response[key].forEach((elem, index) => {

                        //ステータス判定
                        var result1 = s.includes('1');
                        var result0 = s.includes('0');

                        var p = 99;
                        if(result1 == true && result0 == false){p = 1;}
                        if(result1 == false && result0 == true){p = 0;}
                        if(result1 == true && result0 == true){p = 2;}
                        if(p == 99){return;}
                        if(p == 1){
                            if(elem['status'] != 1){return;}
                        }
                        if(p == 0){
                            if(elem['status'] != 0){return;}
                        }

                        $('.lexus-category').append('<div class="l_sell" data-car-name="'+ elem['name'] +'" data-car-status="'+ elem['status'] +'">'+ elem['jpName'] +'</div>');

                    });
                }
            }


        }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("ajax通信：失敗");

        console.log("jqXHR       : " + jqXHR.status); // HTTPステータス取得
        console.log("textStatus  : " + textStatus); // タイムアウト、パースエラー
        console.log("errorThrown : " + errorThrown.message); // 例外情報
    })
}




function list_parts_json_output(c,m,b,cs, tabNum = null) {
    // $('html, body').animate({ scrollTop: $('#frame').offset().top }, 0);
    $('.supplies_list').empty();

    const timestamp = new Date().getTime();
    const url = `./../CAWeb_Data/data/${c}.json?v=${timestamp}`;

    $.ajax({
        url,
        dataType: "json",
    })

    .done(function(response) {
        var brand_list = {
            'TOYOTA': 'brand-color-1',
            'TCD MODELLISTA': 'brand-color-2',
            'TCD GR/TRD': 'brand-color-3',
            'TMP TZ/T-SELECT': 'brand-color-4',
        }
        var color_list = {
            'TOYOTA': '#fbd9dc',
            'TCD MODELLISTA': '#bfd5c8',
            'TCD GR/TRD': '#ffc1c6',
            'TMP TZ/T-SELECT': '#bfe1f1',
            '1000': '#f3d275',
        }

        //モデル名取得
        var list_parts = `
            <p class="list_title" >${carNameJP}</p>
            <hr class="redline">
            <div class="subname_wrapper">
                <div class="subname_container"></div>
            </div>
            <p class="list_title" >絞り込み検索</p>
            <form class="search-form" name="highlight">
                <input type="text" id="word" class="form-control supplies_input" placeholder="ページ内テキスト検索" />
                <input type="button" class="supplies_btn" id="search_highlight" value="検索" />
                <input type="reset" class="supplies_btn2" name="reset" id="reset" value="リセット">
                <p class="search_result_empty"></p>
                <!-- <input name="ページリセット" type="button" value="ページリセット" onClick="location.reload(true);"/> -->
            </form>
            <p id="lineup" class="i1">
                モデル：`;
                //ステータス判定
                var result21 = m.includes('1');
                var result20 = m.includes('0');
                if(cs == 1){
                    if(result21){
                        list_parts += `<input type="checkbox" class="model_status_1" name="model_status[]"  value="1" checked> 販売中`;
                    } else {
                        list_parts += `<input type="checkbox" class="model_status_1" name="model_status[]"  value="1"> 販売中`;
                    }
                } else {
                    list_parts += `<input type="checkbox" class="model_status_1" value="1" disabled="disabled"> 販売中`;
                }
                    if(result20){
                        list_parts += `　<input type="checkbox" class="model_status_0" name="model_status[]"  value="0" checked> 販売終了`;
                    } else {
                        list_parts += `　<input type="checkbox" class="model_status_0" name="model_status[]"  value="0"> 販売終了`;
                    }
                list_parts += `
            </p>
            <div class="brand_wrap_grid">
            <p id="lineup" class="i2">ブランド名：
            <div class="brand_tab_grid">
            `;
            var count = 0;
            for (key in response) {
                var result3 = b.includes(key);
                var result4 = b.includes("999"); // デフォルト状態
                var result5 = b.includes("1000"); // 全て選択オン
                var result6 = b.includes("2000"); // 全て選択オフ
                if (count === 0 && b.length < 1) {
                    result3 = true
                }

                if(key === "subname") {
                    continue;
                }

                // ディーラー用のページ以外からはTMP を除外する
                if( !isDealer() ){
                    if(key === "TMP TZ/T-SELECT"){
                        continue;
                    }
                }

                if(result3 || result4){
                    list_parts += `
                        <input type="radio" class="active" name="brand_status[]" value="${key}" hidden checked>
                        <span class="parts_brand_tab ${brand_list[key] || ''} active" value="${key}">${key}</span>
                    `;
                    $(':root').css('--current-color', color_list[key] || '');
                } else {
                    list_parts += `
                        <input type="radio" class="" name="brand_status[]" value="${key}" hidden>
                        <span class="parts_brand_tab ${brand_list[key] || ''}" value="${key}">${key}</span>
                    `;
                }
                count++;
            }
            if(result5){
                list_parts += `
                    <input type="radio" class="active" name="brand_status[]" value="1000" hidden checked>
                    <span class="parts_brand_tab all active" value="1000">全て表示</span>
                `
                $(':root').css('--current-color', color_list['1000'] || '');
            } else {
                list_parts += `
                    <input type="radio" class="" name="brand_status[]" value="1000" hidden>
                    <span class="parts_brand_tab all" value="1000">全て表示</span>
                `
            }
        list_parts += `
            </div>
            </div>

            <div class="container-table">
                <table id="list_table">
                    <thead>
                        <tr>
                            <th width="100">ブランド</th>
                            <th width="100">品目名</th>
                            <th width="100">適用年月</th>
                            <th width="100">品番</th>
                            <th width="100">取付要領書</th>
                            <th width="100">取扱書</th>
                            <th width="150">参考資料</th>
                            <th width="150">備考</th>
                        </tr>
                    </thead>
            </div>
        `;
        list_parts += `
        <tbody id="target"><!-- ページ内検索の対象 #target -->
        `;
        var td1k = {};
        var td2k = {};
        var td5k = {};
        var td6k = {};
        var td1 = "";
        var td2 = "";
        var td5 = "";
        var td6 = "";
        var s = 0;
        var s2 = 0;
        var s5 = 0;
        var s6 = 0;
        var activeTabNumber = 1;

        var count = 0;
        for (key in response) {

            var result3 = b.includes(key);
            var result4 = b.includes("999");
            if (count === 0 && b.length < 1) {
                result3 = true
            }

            if(key === "subname") {
                response[key].forEach((value, index) => {
                    var subnameButton = `<div class="subname_button" data-tab-number="${index + 1}">${value['nameJP']}</div>`;
                    $('.subname_container').append(subnameButton);
                })
                continue;
            }

            // ディーラー用のページ以外からはTMP を除外する
            if( !isDealer() ){
                if(key === "TMP TZ/T-SELECT"){
                    continue;
                }
            }

            if(result3 == false && result4 == false && result5 == false){continue;}

            response[key].forEach((elem, index) => {

                elem['versions'].forEach((elem2, index2) => {
                    var result5 = m.includes(`${elem2["status"]}`);
                    var versionTabNumber = JSON.stringify(elem2["tab"]) ?? 0;

                    if(m.length == 0){return;}
                    if(result5 == false && elem2["status"] != 2){return;}

                    list_parts += `
                        <tr class="search_output" data-tab-number="${versionTabNumber}">
                    `;

                    // td1
                    list_parts += `
                        <td class="td1 ${brand_list[key] || ''} td1_${s} brand">${key}</td>
                    `;

                    // td2
                    list_parts += `    
                        <td class="td2 text-left td2_${s2} " style="white-space: normal;">${elem["name"]}</td>
                    `;
                    td2 = elem["name"];

                    // td3, 4
                    list_parts += `    
                        <td class="td3 date">${elem2["date"]}</td>
                        <td class="td4 number">${elem2["number"]}</td>
                    `;


                    const elem2_files = Object.entries(elem2['files'])

                    // td5
                    var plam_td5 = 0;
                    var list_parts2 = "";
                    list_parts2 += `<td class="td5" data-supply-key="">`;
                    elem2_files.forEach((elem_files, index) => {
                        if(elem_files[1]['sell'] == "td5"){
                            if(elem_files[1]['class'] == "icon_movie"){
                            list_parts2 += ` 
                            <div class="supplykey td5sell">     
                                <a class="${elem_files[1]["class"]}" data-filetype="pdf_file" data-sell="${elem_files[1]["sell"]}" data-filepath="${rootDir}CAWeb_Data/pdf/${elem_files[1]["url"]}?v=${timestamp}" target="_blank">
                                    <img src="${rootDir}CAWeb_Data/img/Movie_btn2.gif" alt="${elem_files[1]["name"]}">
                                </a>
                            </div>
                            `;    
                            } else {
                            list_parts2 += `  
                            <div class="supplykey td5sell">         
                                <a class="${elem_files[1]["class"]}" data-filetype="pdf_file" data-sell="${elem_files[1]["sell"]}" data-filepath="${rootDir}CAWeb_Data/pdf/${elem_files[1]["url"]}?v=${timestamp}" target="_blank">${elem_files[1]["name"]}</a>
                            </div>
                            `;    
                            }
                            plam_td5 = 1;
                        }
                    });
                    list_parts2 += `</td>`;
                    if(plam_td5 == 0){
                        list_parts += `    
                            <td class="td5">
                                -
                            </td>
                        `;    
                    } else {
                        list_parts += list_parts2;
                    }

                    // td6
                    var plam_td6 = 0;
                    var list_parts2 = "";
                    list_parts2 += `<td class="td6" data-supply-key="">`;
                    elem2_files.forEach((elem_files, index) => {
                        if(elem_files[1]['sell'] == "td6"){
                            if(elem_files[1]['class'] == "icon_movie"){
                                list_parts2 += `  
                                <div class="supplykey td6sell">         
                                    <a class="${elem_files[1]["class"]}" data-filetype="pdf_file" data-sell="${elem_files[1]["sell"]}" data-filepath="${rootDir}CAWeb_Data/pdf/${elem_files[1]["url"]}?v=${timestamp}" target="_blank">
                                        <img src="${rootDir}CAWeb_Data/img/Movie_btn2.gif" alt="${elem_files[1]["name"]}">
                                    </a>
                                </div>
                                `;    
                                } else {
                                list_parts2 += `
                                <div class="supplykey td6sell">            
                                    <a class="${elem_files[1]["class"]}" data-filetype="pdf_file" data-sell="${elem_files[1]["sell"]}" data-filepath="${rootDir}CAWeb_Data/pdf/${elem_files[1]["url"]}?v=${timestamp}" target="_blank">${elem_files[1]["name"]}</a>
                                </div>
                                `;    
                                }
                                plam_td6 = 1;
                        }
                    });
                    list_parts2 += `</td>`;
                    if(plam_td6 == 0){
                        list_parts += `    
                            <td class="td6">
                                -
                            </td>
                        `;    
                    } else {
                        list_parts += list_parts2;
                    }

                    // td7
                    var plam_td7 = 0;
                    var list_parts2 = "";
                    list_parts2 += `<td class="td7" data-supply-key="">`;
                    elem2_files.forEach((elem_files, index) => {
                        if(elem_files[1]['sell'] == "td7"){
                            if(elem_files[1]['class'] == "icon_movie"){
                                list_parts2 += ` 
                                <div class="supplykey td7sell">          
                                    <a class="${elem_files[1]["class"]}" data-filetype="pdf_file" data-sell="${elem_files[1]["sell"]}" data-filepath="${rootDir}CAWeb_Data/pdf/${elem_files[1]["url"]}?v=${timestamp}" target="_blank">
                                        
                                        <img src="${rootDir}CAWeb_Data/img/Movie_btn2.gif" alt="${elem_files[1]["name"]}">
                                    </a>
                                </div>
                                `;    
                                } else {
                                list_parts2 += `    
                                <div class="supplykey td7sell">  
                                    <a class="${elem_files[1]["class"]}" data-filetype="pdf_file" data-sell="${elem_files[1]["sell"]}" data-filepath="${rootDir}CAWeb_Data/pdf/${elem_files[1]["url"]}?v=${timestamp}" target="_blank">${elem_files[1]["name"]}</a>
                                </div>
                                `;    
                                }
                                plam_td7 = 1;
                        }
                    });
                    list_parts2 += `</td>`;
                    if(plam_td7 == 0){
                        list_parts += `    
                            <td class="td7">
                                -
                            </td>
                        `;    
                    } else {
                        list_parts += list_parts2;
                    }


                    // td8
                    list_parts += `    
                        <td class="td8" style="white-space: normal;">${elem2["remarks"]}</td>
                        <input type="hidden" class="brand_name" value="${key}">
                    </tr>
                    `;
                });
            });
            count++;
        }
        list_parts += `        
        </tbody>
        `;
        $('.supplies_list').append(list_parts);

        // サブネームがある車種の場合、切替ボタンを追加する
        if (response['subname']) {
            response['subname'].forEach((value, index) => {
                var activeStatus;
                if (tabNum) {
                    if (tabNum == index+1) {
                        activeStatus = 'active';
                        activeTabNumber = tabNum;
                    }
                }
                else if (index === 0) {
                    activeStatus = 'active';
                } else {
                    activeStatus = '';
                }

                var subnameButton = `
                    <div class="subname_button ${activeStatus}" data-tab-number="${index + 1}">
                        <span class="subname_nameJP">${value['nameJP']}</span>
                    </div>
                `;
                $('.subname_container').append(subnameButton);
            })
        }

        hideUnmatchVersion(activeTabNumber);
        changeRowSpan();

        var frame = document.getElementById('frame').offsetTop - 100;
        window.scrollTo({
            top: frame,
            behavior: 'smooth'
        });

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("ajax通信：失敗");

        console.log("jqXHR       : " + jqXHR.status); // HTTPステータス取得
        console.log("textStatus  : " + textStatus); // タイムアウト、パースエラー
        console.log("errorThrown : " + errorThrown.message); // 例外情報
    })
}


//選択されたtabに応じてtrごとの表示非表示を切り替える関数
function hideUnmatchVersion(tabNumber) {
    var tr = $('tr[data-tab-number]');
    tr.removeClass('version_hide');

    tr.not('[data-tab-number="0"]').each(function() {
        var dataTabNumber = $(this).attr('data-tab-number');

        // 数値の場合
        if( isFinite(dataTabNumber) ) {
            if( dataTabNumber != tabNumber ) {
                $(this).addClass('version_hide');
            }
        }
        // 配列の場合
        else if( Array.isArray( JSON.parse(dataTabNumber) ) ) {
            if( !dataTabNumber.includes(tabNumber) ) {
                $(this).addClass('version_hide');
            }
        }
    })
}

// rowspan を設定する関数
function changeRowSpan() {
    $('tbody').find('.td_hide').removeClass('td_hide');
    $('tr[data-tab-number]').find('td').attr('rowspan', 1);

    for ($i=0; $i<2; $i++) {
        var firstElement = null; // rowspan を増やしていく対象
        var rowspanCounter = 1; // firstElement に与える rowspan 属性の値

        $('tbody tr').each(function(index) {
            var prevEl = $(this).prev();
            var currentTd = $(this).find('td').eq($i);
            var aboveTd = prevEl.find('td').eq($i);

            if (currentTd.text() === aboveTd.text()) {
                if ( !firstElement && !prevEl.hasClass('version_hide') ) {
                    firstElement = prevEl.find('td').eq($i);
                }

                if ( firstElement && !$(this).hasClass('version_hide') ) {
                    rowspanCounter++;
                }

                if ( firstElement ) {
                    firstElement.attr('rowspan', rowspanCounter);
                    $(this).find('td').eq($i).addClass('td_hide');
                }

            } else {
                firstElement = null;
                rowspanCounter = 1;
            }
        });
    }
}


//サブネームのボタン切り替え
$(function() {
    $(document).on('click', '.subname_button', function() {
        var tabNumber = $(this).attr('data-tab-number');

        $('.subname_button').removeClass('active');
        $(this).addClass('active');

        hideUnmatchVersion(tabNumber);
        changeRowSpan();
    })
})


//ラインナップ
$(function() {
    $('input[name="status[]"]').change(function() {
        $('.supplies_list').empty();
        var status = $('input[name="status[]"]:checked').map(function(){
            return $(this).val();
        }).get();

        status_no = status;
        cars_json_output(brand,status_no,vowel);
        cars_json_output_sp(brand,status_no,vowel);
        if(status_no.length == 0){
        }
    });
});

//モデル名
$(function() {
    $(document).on('click','input[name="model_status[]"]',function(){
        model_status = $('input[name="model_status[]"]:checked').map(function(){
            return $(this).val();
        }).get();

        var tabNum = $('.active[data-tab-number]').attr('data-tab-number');
        list_parts_json_output(carName, model_status, brand_status, carStatus, tabNum);
    });
});

//ブランド名
$(function() {
    $(document).on('click','.parts_brand_tab',function(){
        if ($(this).hasClass('active')) {
            return;
        }

        var selectedValue = $(this).attr('value');
        // すべてのラジオボタンのチェックを外す
        $('input[name="brand_status[]"]').prop('checked', false);
        // 選択されたvalueに対応するラジオボタンをチェック状態にする
        $('input[name="brand_status[]"][value="' + selectedValue + '"]').prop('checked', true);

        // チェックされているinputのブランドパーツを描画する
        var brand_status = $('input[name="brand_status[]"]:checked').map(function(){
            return $(this).val();
        }).get();

        var tabNum = $('.active[data-tab-number]').attr('data-tab-number');
        list_parts_json_output(carName, model_status, brand_status, carStatus, tabNum);
    });
});

//全て選択 (未使用)
$(function() {
    $(document).on('click','input[name="all_check"]',function(){
        if ($(this).prop("checked") == true) {
            brand_status = ['1000'];
            list_parts_json_output(carName,model_status,brand_status,carStatus);
          } else {
            brand_status = ['2000'];
            list_parts_json_output(carName,model_status,brand_status,carStatus);
          }
    });
});

  

// ブランド選択以外の部分をデフォルト状態に戻す処理
function resetToDefault() {
    $('.active').not('.brand').removeClass('active');
    $('.toyota-cars').prop('hidden', true);

    $('[data-consonant="a"]'). addClass('active');
    $('.toyota-cars.jp-a-cars').prop('hidden', false);
    $('.supplies_list').empty();
}

// TOYOTAかLEXUSを選ぶ部分
$(document).on('click', '[data-brand-select]', function() {
    if ( ! $(this).hasClass('active') ) {
        resetToDefault();
        $('.supplies_list').empty();

        $('[data-brand-name]').toggle();

        brand = $(this).attr('data-brand-select');
        $('[data-brand-select]').removeClass('active');
        $(`[data-brand-select=${brand}`).addClass('active');

        cars_json_output(brand,status_no,'a');
    }
})

// TOYOTAのア～ラ行を選ぶ処理
$(document).on('click', '[data-consonant]:not(".active")', function() {
    $('.supplies_list').empty();
    var consonant = $(this).attr('data-consonant');
    $('[data-consonant]').removeClass('active');
    $(this).addClass('active');

    vowel = consonant;
    cars_json_output(brand,status_no,vowel);
})


// 車両を選択した時の処理
$(document).on('click', '[data-car-name]', function() {
    $('html, body').animate({ scrollTop: $('#frame').offset().top }, 100);
    if($(this).hasClass('active')) {
    } else {
        $('[data-car-name]').removeClass('active');
        $(this).addClass('active');
        carName = $(this).attr('data-car-name');
        carStatus = $(this).attr('data-status');
        carNameJP = $(this).text();
        tab = $(this).attr('data-tab');

        list_parts_json_output(carName,model_status,brand_status,carStatus);

        setPdfFilePath();
    }
})

//iframeが読み込まれたらの高さやファイルパスを調整する処理
$(document).on('click', '[data-car-name]', function() {
    var el = $('#frame').contents().find('body');

    if( !el.find('table').length) {
    } else if (el[0].clientHeight) {
    }
})

//検索ボタンを押した時の処理
$(document).on('click', '#search_highlight', function() {
    var result = doHighlight();
    if (result === 'false') {
        $('.search_result_empty').text('検索結果はありません');
    } else {
        $('.search_result_empty').text('');
    }
})

//ページ内検索でのkeydown制御
$(document).on('keydown', '#word', function(event) {
    if(event.key === "Enter") {
        var result = doHighlight();
        if (result === 'false') {
            $('.search_result_empty').text('検索結果はありません');
        } else {
            $('.search_result_empty').text('');
        }

        return false;
    }
})

//ページ内検索のリセットボタンの処理
$(document).on('click', '#reset', function() {
    $('.highlight').contents().unwrap();
    $('.search_result_empty').text('');
    // $('.highlight').removeClass('highlight');
})


// 以下、om_terms.js より

function a(e){
    var d=$("div.om-modal");
    d.addClass("js-show");
    d.find("button.om-modal-btn-primary").data("filepath",e);
    $("body").addClass("js-om-modal-show");
    d.on("click.close",function(){
        b()
    });
    d.find("div.om-modal-content-inner").on("click.noevent",function(f){
        f.stopPropagation()
    });
    d.find("button.om-modal-btn-secondary").on("click.close",function(){
        b()
    });
    d.find("button.om-modal-btn-primary").on("click.agree",function(){
        TJP.localstorage.set("omTermsRead","1",{prefix:""});
        window.open($(this).data("filepath"),"_blank");
        b()
    })
}

function b(){
    var d=$("div.om-modal");
    d.removeClass("js-show");
    $("body").removeClass("js-om-modal-show");
    d.off("click.close");
    d.find("div.om-modal-content-inner").off("click.noevent");
    d.find("button.om-modal-btn-secondary").off("click.close");
    d.find("button.om-modal-btn-primary").off("click.agree")
}

function setPdfFilePath() {
    $(document).on('click', 'a[data-filetype="pdf_file"]', function() {
        var d=$(this);
        if(TJP.localstorage.get("omTermsRead",{prefix:""})){
            window.open(d.data("filepath"),"_blank")
        }else{
            a(d.data("filepath"))
        }
        return false
    });
}
$(document).on('click', '[data-supply-key] a', function() {
    setHistory($(this).prop('outerHTML'), $(this).closest('.search_output'));
});


function setHistory(element, parentElement) {
    if ($.cookie('readHistory')) {
        var histories = JSON.parse($.cookie('readHistory'));
    } else {
        var histories = [];
    }
    if ($.cookie('file1')) {
        var file1a = JSON.parse($.cookie('file1'));
    } else {
        var file1a = [];
    }
    if ($.cookie('file2')) {
        var file2a = JSON.parse($.cookie('file2'));
    } else {
        var file2a = [];
    }
    if ($.cookie('file3')) {
        var file3a = JSON.parse($.cookie('file3'));
    } else {
        var file3a = [];
    }

    var dt = new Date();
    var date = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate();

    var date2 = parentElement.find('.date').html();
    var carname = carNameJP;
    var brand = parentElement.find('.brand_name').val();
    var number = parentElement.find('.number').html();
    var fileType = element;
    var file1 = parentElement.find('.td5sell').html();
    var file2 = parentElement.find('.td6sell').html();
    var file3 = parentElement.find('.td7sell').html();

    console.log(file1);
    console.log(file2);
    console.log(file3);




    var message = date + ',' + carname + ',' + brand + ',' + date2 + ',' + number;
    histories.push(message);
    file1a.push(file1);
    file2a.push(file2);
    file3a.push(file3);

    var histories2 = histories.slice(-5);
    var file1a2 = file1a.slice(-5);
    var file2a2 = file2a.slice(-5);
    var file3a2 = file3a.slice(-5);


    $.cookie('readHistory', JSON.stringify(histories2),{expires:7});
    $.cookie('file1', JSON.stringify(file1a2),{expires:7});
    $.cookie('file2', JSON.stringify(file2a2),{expires:7});
    $.cookie('file3', JSON.stringify(file3a2),{expires:7});

}
var open_tab = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,   
];

if(windowWidth < 980){
    $(function() {
        $('.hamburger').click(function() {
            $(this).toggleClass('active2');
     
            if ($(this).hasClass('active2')) {
                
                $('body').append('<div class="modal-backdrop2"></div>');
                $('.globalMenuSp').addClass('active2');
            } else {
                $('.modal-backdrop2').remove();
                $('.globalMenuSp').removeClass('active2');
            }
        });
    });
    
    $(function(){
        $('.syncer-acdn01').click(function(){
            open_check(0,open_tab);
            vowel = "a";
            cars_json_output_sp(brand,status_no,vowel);
    
            $(this).toggleClass('selected');
            if(open_tab[0] == false){open_tab[0] = true;} else {open_tab[0] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn01' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    $(function(){
        $('.syncer-acdn02').click(function(){
            open_check(1,open_tab);
            vowel = "k";
            cars_json_output_sp(brand,status_no,vowel);

            $(this).toggleClass('selected');
            if(open_tab[1] == false){open_tab[1] = true;} else {open_tab[1] = false;}
            $('#syncer-acdn01').trigger("click");
        });
    });
    $(function() {
        $( '.syncer-acdn02' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn03').click(function(){
            open_check(2,open_tab);
            $(this).toggleClass('selected');
            vowel = "s";
            cars_json_output_sp(brand,status_no,vowel);
            if(open_tab[2] == false){open_tab[2] = true;} else {open_tab[2] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn03' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn04').click(function(){
            open_check(3,open_tab);
            $(this).toggleClass('selected');
            vowel = "t";
            cars_json_output_sp(brand,status_no,vowel);
            if(open_tab[3] == false){open_tab[3] = true;} else {open_tab[3] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn04' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn05').click(function(){
            open_check(4,open_tab);
            $(this).toggleClass('selected');
            vowel = "n";
            cars_json_output_sp(brand,status_no,vowel);
            if(open_tab[4] == false){open_tab[4] = true;} else {open_tab[4] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn05' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn06').click(function(){
            open_check(5,open_tab);
            vowel = "h";
            cars_json_output_sp(brand,status_no,vowel);
            $(this).toggleClass('selected');
            if(open_tab[5] == false){open_tab[5] = true;} else {open_tab[5] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn06' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn07').click(function(){
            open_check(6,open_tab);
            vowel = "m";
            cars_json_output_sp(brand,status_no,vowel);
            $(this).toggleClass('selected');
            if(open_tab[6] == false){open_tab[6] = true;} else {open_tab[6] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn07' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn08').click(function(){
            open_check(7,open_tab);
            vowel = "y";
            cars_json_output_sp(brand,status_no,vowel);
            $(this).toggleClass('selected');
            if(open_tab[7] == false){open_tab[7] = true;} else {open_tab[7] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn08' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
    
    
    $(function(){
        $('.syncer-acdn09').click(function(){
            open_check(8,open_tab);
            vowel = "r";
            cars_json_output_sp(brand,status_no,vowel);
            $(this).toggleClass('selected');
            if(open_tab[8] == false){open_tab[8] = true;} else {open_tab[8] = false;}
        });
    });
    $(function() {
        $( '.syncer-acdn09' ).click( function(){
            var target = $( this ).data( 'target' );
            $( '#' + target ).slideToggle();
            return false ;
        });
    });
}

function open_check(n,open_tab) {
    open_tab.forEach((elem, index) => {
        if( index == n ){ return; }
        id_ary = ['#syncer-acdn-01','#syncer-acdn-02','#syncer-acdn-03','#syncer-acdn-04','#syncer-acdn-05','#syncer-acdn-06','#syncer-acdn-07','#syncer-acdn-08','#syncer-acdn-09'];
        id_ary2 = ['.syncer-acdn01','.syncer-acdn02','.syncer-acdn03','.syncer-acdn04','.syncer-acdn05','.syncer-acdn06','.syncer-acdn07','.syncer-acdn08','.syncer-acdn09'];
        if(elem == true){
        // console.log(id_ary[index]);
        $(function() {
            $( id_ary[index] ).slideToggle();
            $( id_ary2[index] ).toggleClass('selected');

        });
        open_tab[index] = false ;
        }
    });
}
