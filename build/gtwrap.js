gtwrap: function () {
    return this.each(function () {
        var $this = $(this),
            $inner = $this.find('.gtwrap__in'),
            $table = $this.find('table'),
            mtop = parseInt($table.css('margin-top')),
            mbottom = parseInt($table.css('margin-top')),
            width,
            tableWidth,
            leftPos = $inner.scrollLeft(),
            offset = 5,
            vCssClass = 'visible';

        if(mtop) {
            $table.css({'margin-top': 0});
            $this.css({'margin-top': mtop + 'px'});
        }
        if(mbottom) {
            $table.css({'margin-bottom': 0});
            $this.css({'margin-bottom': mbottom + 'px'});
        }

        $this.prepend('<div class="gtwrap__left">');
        $this.append('<div class="gtwrap__right">');

        var $left = $this.find('.gtwrap__left'),
            $right = $this.find('.gtwrap__right');

        function varUpd() {
            width = $this.outerWidth();
            tableWidth = $table.outerWidth();
        }
        varUpd();

        function dt() {
            var pos = leftPos+width;

            if (tableWidth !== width){
                if(pos >= tableWidth-offset) {
                    $left.addClass(vCssClass);
                    $right.removeClass(vCssClass);
                }
                if(leftPos <= offset) {
                    $left.removeClass(vCssClass);
                    $right.addClass(vCssClass);
                }
                if(leftPos > offset && pos < tableWidth-offset) {
                    $left.addClass(vCssClass);
                    $right.addClass(vCssClass);
                }
            } else {
                $left.removeClass(vCssClass);
                $right.removeClass(vCssClass);
            }

        }
        dt();

        $(window).on('resize', function () {
            varUpd();
            dt();
        });

        $inner.on('scroll', function () {
            leftPos = $inner.scrollLeft();
            varUpd();
            dt();
        });
    });
};