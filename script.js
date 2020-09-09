$(function () {
    $('#numPan').on('change', function(e) {
        refresh();
    });
    $('#numBu').on('change', function(e) {
        refresh();
    });
    document.querySelector('#swtichOya').addEventListener('change', function(e) {
        refresh();
    });
    $('#btnCalc').on('click', function (e) {
        refresh()
    });
});

refresh = function () {
    let pan = parseInt($('#numPan').val());
    let bu = parseInt($('#numBu').val());
    // let oya = $('#swtichOya').attr('checked');
    let oya = document.querySelector('#swtichOya').checked;
    console.log(oya)
    if (isNaN(pan)) pan = 0;
    if (isNaN(bu)) bu = 0;
    let score = calcScore(oya, pan, bu);
    if (score['tsumo'][0] == score['tsumo'][1]) {
        $('#txtTsumo').text(score['tsumo'][0] + ' all');
    } else {
        $('#txtTsumo').text(score['tsumo'].join('/'));
    }
    $('#txtRon').text(score['ron']);
}

calcScore = function (oya, pan, bu) {
    /* 부수 계산 */
    if (pan < 3 ||
        (pan == 3 && bu <= 60) ||
        (pan == 4 && bu <= 30)) {
        if (bu != 25) {
            bu = oneCeil(bu);
        }
        let a = bu * Math.pow(2, (pan + 2));
        let b;
        if (oya) {
            b = 2;
        } else {
            b = 1;
        }
        let c = [a * 2, a * b, a * b];

        return {'tsumo': [tenCeil(c[1]), tenCeil(c[0])],
                'ron': tenCeil(c[0] + c[1] + c[2])}
    }
    /* 판수 계산 */
    else {
        let a;
        if (pan >= 26) {
            // 더블 역만
            a = 16000;
        } else if (pan >= 13) {
            // 역만
            a = 8000;
        } else if (pan >= 11) {
            // 삼배만
            a = 6000;
        } else if (pan >= 8) {
            // 배만
            a = 4000;
        } else if (pan >= 6) {
            // 하네만
            a = 3000;
        } else {
            // 만관
            a = 2000;
        }
        let b;
        if (oya) {
            b = 2;
        } else {
            b = 1;
        }
        let c = [a * 2, a * b, a * b];

        return {'tsumo': [c[0], c[1]],
                'ron': c[0] + c[1] + c[2]}
    }
}

tenCeil = function (a) {
    return parseInt(Math.ceil(a / 100)) * 100;
}

oneCeil = function (a) {
    return parseInt(Math.ceil(a / 10)) * 10;
}
