<?php
if(isset($_POST['submit'])){
	$Levels = $_POST['levels'];
	$file = $_FILES['file'];
	print_r($file);
	$fileName = $_FILES['file']['name'];
	$fileTmpName = $_FILES['file']['tmp_name'];
	$fileSize = $_FILES['file']['size'];
	$fileError = $_FILES['file']['error'];
	$fileType = $_FILES['file']['type'];
	if(is_uploaded_file($fileTmpName))//注意tempName
	{
		echo ("$fileName is uploaded via HTTP POST");
	}else{
		echo ("$fileName is not uploaded via HTTP POST");
	}

	$fileExt = explode('.', $fileName);
	$fileActualExt = strtolower(end($fileExt));

	$allowed = array('jpg', 'jpeg', 'png');

	if(in_array($fileActualExt, $allowed)){
		if($fileError === 0){
			if($fileSize < 100000){
				$fileNameNew = uniqid('',true).".".$fileActualExt;
				if ($Levels == "xx") {
					$fileDestination = 'uploads/'.$fileNameNew;
				}else if ($Levels == "cz") {
					$fileDestination = 'uploads/'.$fileNameNew;
				}else{
					$fileDestination = 'uploads/'.$fileNameNew;
				}
				move_uploaded_file($fileTmpName, $fileDestination);
				//header("Location: index.php?uploadsuccess");
			}else{
				echo "Your file is too big!";
			}
		}else{
			echo "There was an error uploading your file!";
		}
	}else{
		echo "You cannot upload files of this type!";
	}
}