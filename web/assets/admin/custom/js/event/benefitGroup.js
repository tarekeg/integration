/**
 * @author Amine Kefi <akefi@netisse.com>
 */

$(function() {

    /**
     * edit/update benefitGroup
     */
    $('body').on('submit', '#submitEventBenefit', function (e) {
        /*e.preventDefault();


        var $this = $(this),
            $table = $("#js-prestation-group-table");

        $.ajax({
            type: $this.attr('method'),
            url: $this.attr('action'),
            data: $this.serialize(),

        })
        .done(function (data) {
            $html = $(data.html);
            if(data.id) {
                $('body').find('tr#bg-'+data.id).replaceWith($html);
            }else {
                $table.find('#js-tbody').append($html);
            }

            $('.js-ajax-modal.modal').modal('hide');
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert('error !');
        });*/
    });
    
    /**
     * edit/update benefit
     */
    $('body').on('submit', '#submitBenefit', function (e) {
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: $this.attr('method'),
            url: $this.attr('action'),
            data: $this.serialize(),

        })
        .done(function (data) {
            $html = $(data.html);
            if(data.id) {
                $('body').find('tr#b-'+data.id).replaceWith($html);
            }else {               
                $('#js-prestation-table-'+data.id_benefit_group).find('#js-tbody').append($html);
            }

            $('.js-ajax-modal.modal').modal('hide');
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert('error !');
        });
    });
    
    
    /*
     * delete
     */
    
    $('body').on('click', '#benefit .js-delete', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        
       $.ajax({
            url: href,
        })
        .done(function (data) {
            $html = $(data.html);
            if(data.id_element) {
                if(data.name == "benefitGroup") {
                  $('body').find('tr'+data.id_element).next('.detail-row').fadeOut(function(){
                      $(this).remove();
                  });  
                }
                $('body').find('tr'+data.id_element).fadeOut(function() {
                    $(this).remove();
                });
            }else {
                alert('error !');
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert('error !');
        });
       
    })

});
