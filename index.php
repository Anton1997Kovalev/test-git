<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php include_once 'inc/style.php'; ?>
	<title>Document</title>
</head>

<body>
	<div class="page">
		<?php include_once 'inc/header.php'; ?>
		<main class="main main-page">
			<div class="container">
				<h2>ajhv</h2>
				<form action="" class="form">
					<div class="form-item input _required">
						<label for="" class="form-label">Name</label>
						<div class="form-item__body">
							<input type="text" class="form-input without-number" data-min="2" data-max="11" maxlength="11" placeholder="name">
						</div>
					</div>
					<div class="form-item input _required">
						<label for="" class="form-label">Password</label>
						<div class="form-item__body">
							<input type="password" class="form-input " data-min="6" data-max="8" maxlength="8" placeholder="password">
						</div>
					</div>
					<div class="form-item input _required">
						<label for="" class="form-label">Number</label>
						<div class="form-item__body">
							<input type="text" class="form-input number " inputmode="numeric" data-min="5" data-max="5" maxlength="5" placeholder="number">
						</div>
					</div>
					<div class="form-item input _required">
						<label for="" class="form-label">Phone</label>
						<div class="form-item__body">
							<input type="text" class="form-input phone" inputmode="tel" data-min="16" data-max="16" maxlength="16" placeholder="phone">
						</div>
					</div>
					<div class="form-item input _required">
						<label for="" class="form-label">email</label>
						<div class="form-item__body">
							<input type="email" name="email" autocapitalize="off" autocorrect="off" autocomplete="email" class="form-input email " inputmode="email" autocomplete="email" placeholder="email">
						</div>
					</div>
					<div class="form-item custom input _required">
						<label for="" class="form-label">Custom input email</label>
						<div class="form-item__body">
							<input type="email" name="email2" autocapitalize="off" autocorrect="off" autocomplete="email" class="form-input email " inputmode="email" autocomplete="email" placeholder="">
						</div>
					</div>
					<div class="form-radiobtns _required">
						<div class="form-label">Radio</div>
						<div class="form-item">
							<input id="radio-1" name="btns[]" type="radio" class="form-radiobtn">
							<label for="radio-1" class="form-check-label">Radiobtn</label>
						</div>
						<div class="form-item">
							<input id="radio-2" name="btns[]" type="radio" class="form-radiobtn">
							<label for="radio-2" class="form-check-label">Radiobtn</label>
						</div>
					</div>
					<div class="form-radiobtns custom _required">
						<div class="form-label">Custom Radio</div>
						<div class="form-item">
							<input id="radio-3" name="btns1[]" type="radio" class="form-radiobtn">
							<label for="radio-3" class="form-check-label">Radiobtn</label>
						</div>
						<div class="form-item">
							<input id="radio-4" name="btns1[]" type="radio" class="form-radiobtn">
							<label for="radio-4" class="form-check-label">Radiobtn</label>
						</div>
					</div>
					<div class="form-checkboxes _required">
						<div class="form-label">Check</div>
						<div class="form-item">
							<input type="checkbox" id="check" class="form-checkbox">
							<label for="check" class="form-check-label">check</label>
						</div>
						<div class="form-item">
							<input type="checkbox" id="check-1" class="form-checkbox">
							<label for="check-1" class="form-check-label">check</label>
						</div>
					</div>
					<div class="form-checkboxes custom _required">
						<div class="form-label">Custom checkbox</div>
						<div class="form-item">
							<input type="checkbox" id="check-3" class="form-checkbox">
							<label for="check-3" class="form-check-label">check</label>
						</div>
						<div class="form-item">
							<input type="checkbox" id="check-4" class="form-checkbox">
							<label for="check-4" class="form-check-label">check</label>
						</div>
					</div>
					<div class="form-item textarea _required">
						<label for="" class="form-label">Massege</label>
						<textarea class="form-textarea "></textarea>
					</div>
					<div class="form-item custom textarea _required">
						<label for="" class="form-label">Massege</label>
						<textarea class="form-textarea"></textarea>
					</div>
					<div class="form-item select _required">
						<label for="" class="form-label">Select</label>
						<div class="form-item__body">
							<select name="products" class="form-select ">
								<option value="" selected="selected">Пункт №1</option>
								<option value="2">Пункт №2</option>
								<option value="3">Пункт №3</option>
								<option value="4">Пункт №4</option>
							</select>
						</div>
					</div>
					<div class="form-item custom select _required">
						<input type="hidden" class="form-input hidden ">
						<label for="" class="form-label">Custom Select</label>
						<div class="form-item__body">
							<div class="select-box select-box__js sb-anim-height no-hidden-li">
								<div class="select-box__head">
									<div class="select-box__label">Selected Item</div>
								</div>
								<div class="select-box__body">
									<div class="select-box__content">
										<ul class="select-box__list list-style-none">
											<li class="select-box-item__js">
												<span>
													Item-1
												</span>
											</li>
											<li class="select-box-item__js">
												<span>
													Item-2
												</span>
											</li>
											<li class="select-box-item__js">
												<span>
													Item-3
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-item file ">
						<label for="" class="form-label">File</label>
						<div class="form-item__body">
							<input type="file" class="form-file" data-formats="image, pdf, word, excel, txt" data-max-size="5242880">
							<div class="help-block"></div>
						</div>
					</div>
					<div class="form-item custom file _required">
						<label for="" class="form-label">Custom File</label>
						<div class="form-item__body">
							<input type="file" class="form-file" multiple data-formats="image, pdf, word, excel, txt" data-max-size="5242880" data-max-files="5">
							<div class="form-file__label">Прикрепить файл</div>
							<div class="form-file__list">

							</div>
							<div class="help-block"></div>
						</div>
					</div>
					<button class="form-btn btn">Click</button>
				</form>
			</div>

		</main>
	</div>

	<?php include_once 'inc/script.php'; ?>
</body>

</html>