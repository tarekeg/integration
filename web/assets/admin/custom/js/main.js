$(function() {
   $('body').on('click','a[data-toggle="modal"]',function(e){
        var action = $(this).data('href');
        //$('#page-loading').fadeIn();
        $.ajax({
            url : action,
            type: "GET",
            success: function(response) {
                //$('#page-loading').hide();
                $('body').addClass('modal-open');
                var $modal = $('<div class="modal fade js-ajax-modal"></div>');
                    $modal.html(response).modal();
                    // $modal.find('.nav').tab('show');
            }
        });
        e.preventDefault();
    });

    $('body').on('hidden.bs.modal', '.js-ajax-modal.modal', function(e) {
        $(this).remove();
        $('body').removeClass('modal-open');
    });

});

