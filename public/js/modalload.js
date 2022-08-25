const modalLoad = action => {

	if (action == 'addfolder') {
		$('#modalcontent')
		.html(`
			<button class="btn btn-light" onclick="$('#modal').fadeOut('fast')">
				<i class="far fa-times"></i>
			</button>
			<input type="text" class="form-control text-center" placeholder="FOLDER NAME" id="addfolder">
			<button class="btn btn-light" type="button" id="addfolderbtn">
				<i class="far fa-plus"></i>
			</button>
		`)
		.promise()
		.then(() => {
			$('#addfolderbtn').click(() => {
				socket.emit('addfolder', $('#addfolder').val(), cb => {
	                cb ? $('#addfolder').addClass('is-invalid') : $('#addfoldermodal').fadeOut('fast')
	            })
			})
		})
	}

	if (action == 'addfile') {
		$('#modalcontent')
		.html(`
			<button class="btn btn-light" onclick="$('#modal').fadeOut('fast')">
				<i class="far fa-times"></i>
			</button>
			<input type="file" class="form-control" id="addfile">
		`)
		.promise()
		.then(() => {
			siofu.listenOnInput($('#addfile')[0])
	        $('#addfile').on('change', e => {
	            $('#modal').fadeOut('fast')
	            $('#uploadprogress').fadeIn(100)
	        })
		})
	}

	$('#modal').fadeIn('fast')

}