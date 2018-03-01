/**
 * @author Amine Kefi <akefi@netisse.com>
 */
(function($) {
    return $.fn.eventImage = function() {
        return this.each(function() {

            /* Variables
            ---------------------------------------
            */
            var $this, $delete, $upload, $file, $img, $loading, url, id, init, uploadFile, deleteFile;

            $this = $(this);
            $delete = $this.find('.action .delete');
            $upload = $this.find('.action .upload');
            $file = $this.find('input[type="file"]');
            $img = $this.find('.img img');

            url = $this.data('href');
            id = $this.data('id');

            /* Upload file
            ---------------------------------------
            */
            uploadFile = function(file) {
                var formData = new FormData(),
                    $loading = $('<span class="loader"></span>');

                formData.append('formData', file);
                formData.append('id_image', id);
                $upload.append($loading);

                $.ajax({
                    url: url,
                    type: 'POST',
                    data:  formData,
                    mimeType:"multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData:false,
                    dataType: 'json',
                    success: function(html){
                        if(!html.error) {
                           // $img.attr("src", html.image);
                            if(html.label == "video") {
                                $this.find('.img video').html('<source src="'+ html.image+'" type="video/mp4">');
                            }else {
                                $img.attr("src", html.image);
                            }

                        }else {
                            if(html.msg)
                                alert(html.msg)
                        }
                        $loading.fadeOut(function () {
                            $(this).remove();
                            $file.val("");
                        });
                    },
                    error : function(resultat, statut, erreur){
                        alert('error !');
                        $loading.fadeOut(function () {
                            $(this).remove();
                            $file.val("");
                        });
                    }
                });
            };

            /* Delete file
            ---------------------------------------
            */
            deleteFile = function () {

                var  $loading = $('<span class="loader"></span>');
                $delete .append($loading);

                $.ajax({
                    url: url,
                    type: 'POST',
                    data:  {delete : true, id_image: id },
                    dataType: 'json',
                    success: function(html){
                        if(!html.error) {
                            if(html.label == "video") {
                                $this.find('.img').html('<video class="video" width="100%" preload="metadata"><source src="" type="video/mp4"></video>');
                            }else {
                                $img.attr("src", html.image);
                            }

                        }
                        $loading.fadeOut(function () {
                            $(this).remove();
                        });
                    },
                    error : function(resultat, statut, erreur){
                        alert('error !');
                        $loading.fadeOut(function () {
                            $(this).remove();
                        });
                    }
                });
            };

            /* Initialize
            ---------------------------------------
            */
            init = function() {

                $file.on('change',function(e){
                    e.preventDefault();
                    var file = this.files[0];
                    uploadFile(file);
                });

                $upload.on('click', function (e) {
                    e.preventDefault();
                    $file.click();
                });

                $delete.on('click', function (e) {
                    e.preventDefault();
                    deleteFile();
                })
            };

            return init();
        });
    };
})(jQuery);


$(function() {
    $('.event-img').eventImage();
});
