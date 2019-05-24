<? php
echo '<!DOCTYPE html>';
echo '<html>';
echo '<head>';
echo '<meta charset="UTF-8" />';
echo '<title>JS Game</title>';
echo '<style>';
echo 'canvas {';
echo 'border: 1px solid #d3d3d3;';
echo 'background-color: #f1f1f1;';
echo '}';
echo 'ul.menu-list {';
echo 'list-style: none;';
echo '}';
echo '#menu.main {';
echo 'background-image: url("images/menu_bg.jpg");';
echo 'height: 300px;';
echo 'width: 400px;';
echo '}';
echo '#main h1 {';
echo 'color: white;';
echo 'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,';
echo '1px 1px 0 #000;';
echo '}';
echo '.button {';
echo 'display: block;';
echo 'width: 150px;';
echo 'line-height: 30px;';
echo 'border: 1px solid #aa2666;';
echo 'color: white;';
echo 'font-weight: bold;';
echo 'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,';
echo '1px 1px 0 #000;';
echo 'background-color: #fb1886;';
echo 'background-image: -webkit-linear-gradient(';
echo 'bottom,';
echo '#fb1886 0%,';
echo '#b30d5d 100%';
echo ');';
echo 'background-image: linear-gradient(to bottom, #fb1886 0%, #b30d5d 100%);';
echo 'border-radius: 5px;';
echo 'text-decoration: none;';
echo 'text-align: center;';
echo '}';
echo '.button:hover {';
echo 'background-color: #b30d5d;';
echo 'background-image: -webkit-linear-gradient(';
echo 'bottom,';
echo '#b30d5d 0%,';
echo '#fb1886 100%';
echo ');';
echo 'background-image: linear-gradient(to bottom, #b30d5d 0%, #fb1886 100%);';
echo '}';
echo '</style>';
echo '</head>';
echo '<body>';
echo '<div id="menu-container" class="wrapper">';
echo '<div id="menu" class="main">';
echo '<div id="main">';
echo '<h1>JS Game</h1>';
echo '<ul class="menu-list">';
echo '<li>';
echo '<a onClick="startGame(true)" class="button play">Player Mode</a>';
echo '</li>';
echo '<li>';
echo '<a onClick="startGame(false)" class="button credits">AI Mode</a>';
echo '</li>';
echo '</ul>';
echo '</div>';
echo '</div>';
echo '</div>';
echo '</body>';
echo '</html>';
echo '';
echo '<!-- Libraries -->';
echo '<script src="lib/tf.js"></script>';
echo '<script src="lib/helpers.js"></script>';
echo '';
echo '<!-- Main Modules -->';
echo '<script src="sketch.js"></script>';
echo '<script src="neuroEvolution/neuralNetwork.js"></script>';
echo '<script src="neuroEvolution/geneticAlgorithm.js"></script>';
echo '';
echo '<!-- Game Components -->';
echo '<script src="gamecomponents/gameArea.js"></script>';
echo '<script src="gamecomponents/shared/gameComponent.js"></script>';
echo '<script src="gamecomponents/boat.js"></script>';
echo '<script src="gamecomponents/person.js"></script>';
echo '<script src="gamecomponents/obstacle.js"></script>';
echo '<script src="gamecomponents/ui/playerHud.js"></script>';
echo '<script src="gamecomponents/ui/learningHud.js"></script>';
echo '';
?>