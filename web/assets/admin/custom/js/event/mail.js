/**
 * @author Amine Kefi <msfari@netisse.com>
 */
function initTinyMCE(){
    tinymce.init({
        height: 400,
        branding: false,
        selector: 'textarea',
        cleanup : true,
        plugins: [
            "jbimages save imagetools advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "textcolor",
            "insertdatetime media table contextmenu paste"
        ],
        toolbar: "insertfile undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify jbimages | bullist numlist outdent indent ",
    });
}
if( $('textarea').length )
{
    initTinyMCE();
}

if( $('.select-tag').length )
{
    $('.select-tag').select2()
}
