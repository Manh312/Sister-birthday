const celebrationMessage = "Chúc Mừng Sinh Nhật Chị Tú Anh ";
const messageElement = document.getElementById("celebrationMessage");
const images = [
    "public/images/images1.jpg",
    "public/images/images2.jpg", 
    "public/images/images3.jpg",
    "public/images/images4.jpg",
];

const letterText = [
    "Em chúc chị sinh nhật vui vẻ! ", 
    "Chúc chị luôn hạnh phúc, luôn xinh đẹp và thành công. ", 
    "Mong rằng chị sẽ sớm tìm được người bạn đời phù hợp. ",
    "Và hy vọng mọi điều tốt đẹp nhất sẽ đến với chị. ",

];

let currentImageIndex = 0;
let letterIndex = 0;
let textIndex = 0;
let currentLetterIndex = 0;

function typeLetter() {
    messageElement.classList.remove('hidden');
    if (letterIndex < celebrationMessage.length) {
        messageElement.innerHTML += celebrationMessage.charAt(letterIndex);
        letterIndex++;
        setTimeout(typeLetter, 200);
    } else {
        document.getElementById("nextButton").style.display = 'block';
    }
}

document.getElementById("nextButton").addEventListener("click", () => {
    document.getElementById("nextButton").style.display = 'none'; // Ẩn nút ngay khi nhấn
    document.querySelector('.container').style.opacity = '0.5'; // Mờ nền chính
    showOverlay();
    showMockup(); // Gọi hàm để hiển thị mockup
});

function showOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove('hidden');
  setTimeout(() => {
      overlay.classList.add('show');
  }, 10);
}

function showMockup() {
    const mockup = document.getElementById("mockup");
    const mockupText = document.getElementById("mockupText");

    mockupText.innerHTML = '';
    mockup.classList.remove('hidden'); // Hiện mockup

    // Thêm lớp show để hiện mockup
    setTimeout(() => {
        mockup.classList.add('show');
    }, 10); // Để có thời gian cho lớp hidden được loại bỏ

    function typeMockupText() {
        if (textIndex < letterText[currentLetterIndex].length) {
            mockupText.innerHTML += letterText[currentLetterIndex].charAt(textIndex);
            textIndex++;
            setTimeout(typeMockupText, 100);
        } else {
            setTimeout(() => {
                currentLetterIndex++;
                if (currentLetterIndex < letterText.length) {
                    textIndex = 0;
                    typeMockupText();
                } else {
                    setTimeout(() => {
                      mockup.classList.remove('show'); // Ẩn mockup
                      const overlay = document.getElementById("overlay");
                      overlay.classList.remove('show'); // Ẩn lớp overlay
                      document.querySelector('.container').style.opacity = '1'; // Đem nền chính về trạng thái bình thường
                      showImages(); // Gọi hàm để hiển thị hình ảnh
                    }, 2000);
                }
            }, 2000);
        }
    }
    
    typeMockupText();
}

function showImages() {
    showNextImage();

    const interval = setInterval(() => {
        showNextImage();

        if (currentImageIndex === images.length) {
            clearInterval(interval);
            document.getElementById("surprise").classList.remove('hidden');
        }
    }, 2000);
}

function showNextImage() {
  const birthdayImage = document.getElementById("birthdayImage");
  if (currentImageIndex < images.length) {
      // Ẩn hình ảnh hiện tại
      birthdayImage.classList.remove('show');
      
      // Cập nhật ảnh mới
      birthdayImage.src = images[currentImageIndex];
      
      // Thêm lớp show sau một khoảng thời gian ngắn
      setTimeout(() => {
          birthdayImage.classList.add('show');
      }, 50); // Thời gian ngắn để cho việc thay đổi src hoàn thành
      currentImageIndex++;
  }
}


typeLetter(); 
