<style>

    .modal:before {
        content: "";
        display: none;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
    }
    .modal:target:before {
        display: block;
    }
    .modal:target .modal-dialog {
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        transform: translate(0, 0);
        top: 20%;
    }
    .modal-dialog {
        background: #fefefe;
        border: #333333 solid 1px;
        border-radius: 5px;
        margin-left: -200px;
        position: fixed;
        left: 50%;
        top: -100%;
        z-index: 11;
        width: 360px;
        -webkit-transform: translate(0, -500%);
        -ms-transform: translate(0, -500%);
        transform: translate(0, -500%);
        -webkit-transition: -webkit-transform 0.3s ease-out;
        -moz-transition: -moz-transform 0.3s ease-out;
        -o-transition: -o-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
    }

    /*ADDED TO STOP SCROLLING TO TOP*/
    #close {
        display: none;
    }


</style>
<div class="wrap">
    alksdf lkj asdf<br />
    <a href="#modal-one" class="btn btn-big">Modal!</a>
</div>

<!-- Modal -->
<div class="modal" id="modal-one" aria-hidden="true">
    <div class="modal-dialog">
        test
        <div class="modal-footer">
            <a href="#close" class="btn">Nice!</a>  <!--CHANGED TO "#close"-->
        </div>
    </div>
</div>
</div>
<!-- /Modal -->