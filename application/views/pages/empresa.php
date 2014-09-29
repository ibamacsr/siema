<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>SIEMA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap -->
    <link href="<?= base_url()?>assets/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
    <!-- <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet"> -->
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

    <style>
        body, html {
          margin: 0;
          padding: 0;
        }
    </style>

  </head>

  <body>

	<?php echo form_open('Auth/primeiro_acesso', array('id' => 'formAccess',  'name' => 'formAccess')); ?>

		<div class="row-fluid">
			<div class="span4">
				<div class="control-group">
					<label class="control-label span4" style="display:inline;">
						<input type="radio" name="optionCPFCNPJ" id="optionCPF" value="0" checked>CPF:
					</label>
					<label class="control-label span4" style="display:inline;">
						<input type="radio" name="optionCPFCNPJ" id="optionCNPJ" value="1">CNPJ:
					</label>
				</div>
				<div id="fieldCPF" class="control-group">
					<div class="controls">
						<input id="inputCPF" class="input-large" type="text" name="inputCPF" style="width: 17em">
					</div>
				</div>
				<div id="fieldCNPJ" class="control-group " style="display:none;">
					<div class="controls">
						<input id="inputCNPJ" class="input-large" type="text" name="inputCPF" style="width: 17em">
					</div>
				</div>
			</div>
		</div>
	<?php echo form_close(); ?>


  </body>
</html>