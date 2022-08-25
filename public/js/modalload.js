const modalLoad = (action, filename) => {

	switch(action) {
		case 'addfolder':
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

			break

		case 'addfile':
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

			break

		case 'deleteitem':
			$('#modalcontent')
			.html(`
				<button class="btn btn-light" onclick="$('#modal').fadeOut('fast')">
					<i class="far fa-times"></i>
				</button>
				<input type="text" class="form-control text-center" value="delete ${filename}?" disabled readonly>
				<button class="btn btn-light" type="button" id="deleteitembtn">
					<i class="far fa-trash"></i>
				</button>
			`)
			.promise()
			.then(() => {
				$('#deleteitembtn').click(() => {
					socket.emit('deleteitem', filename, cb => {
		                cb ? null : null
		            })
				})
			})

			break

		case 'renameitem':
			$('#modalcontent')
			.html(`
				<button class="btn btn-light" onclick="$('#modal').fadeOut('fast')">
					<i class="far fa-times"></i>
				</button>
				<input type="text" class="form-control text-center" placeholder="rename ${filename}" id="renameitem">
				<button class="btn btn-light" type="button" id="renameitembtn">
					<i class="far fa-edit"></i>
				</button>
			`)
			.promise()
			.then(() => {
				$('#renameitembtn').click(() => {
					socket.emit('renameitem', filename, cb => {
		                cb ? null : null
		            })
				})
			})

			break

		case 'shareitem':
			$('#modalcontent')
			.html(`
				<button class="btn btn-light" onclick="$('#modal').fadeOut('fast')">
					<i class="far fa-times"></i>
				</button>
				<input type="text" class="form-control text-center" value="somelink" disabled readonly>
				<button class="btn btn-light" type="button" id="shareitembtn">
					<i class="far fa-copy"></i>
				</button>
			`)
			.promise()
			.then(() => {
				$('#shareitembtn').click(() => {
					socket.emit('shareitem', filename, cb => {
		                cb ? null : null
		            })
				})
			})

			break


	}

	$('#modal').fadeIn('fast')

}