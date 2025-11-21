// script.js

// 1. Data Pertanyaan
const questions = [
    {
        question: "Cabang Biologi yang mempelajari tentang virus adalah...",
        options: ["Botani", "Mikologi", "Virologi", "Zoologi"],
        answer: "Virologi"
    },
    {
        question: "Urutan tingkatan organisasi kehidupan dari yang terkecil hingga terbesar adalah...",
        options: [
            "Sel-Jaringan-Organ-Sistem Organ-Organisme",
            "Organisme-Sistem Organ-Organ-Jaringan-Sel",
            "Jaringan-Sel-Organ-Sistem Organ-Organisme",
            "Sel-Organ-Jaringan-Sistem Organ-Organisme"
        ],
        answer: "Sel-Jaringan-Organ-Sistem Organ-Organisme"
    },
    {
        question: "Mikroskop yang digunakan untuk melihat struktur internal sel secara detail adalah...",
        options: ["Mikroskop Cahaya", "Mikroskop Elektron Scanning (SEM)", "Mikroskop Elektron Transmisi (TEM)", "Mikroskop Stereo"],
        answer: "Mikroskop Elektron Transmisi (TEM)"
    },
    {
        question: "Hewan yang memiliki sel prokariotik adalah...",
        options: ["Amoeba", "Bakteri", "Jamur", "Alga"],
        answer: "Bakteri"
    },
    {
        question: "Langkah pertama dalam Metode Ilmiah adalah...",
        options: ["Membuat Hipotesis", "Melakukan Eksperimen", "Merumuskan Masalah", "Menarik Kesimpulan"],
        answer: "Merumuskan Masalah"
    }
];

// 2. Variabel Status Kuis
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// 3. Elemen DOM
const questionText = document.getElementById('question-text');
const optionsArea = document.getElementById('options-area');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const scoreDisplay = document.getElementById('score-display');
const totalQuestionsDisplay = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');

// 4. Fungsi Utama
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        // Tampilkan Pertanyaan
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = `P${currentQuestionIndex + 1}. ${currentQuestion.question}`;
        optionsArea.innerHTML = ''; // Bersihkan pilihan sebelumnya
        
        selectedAnswer = null;
        submitBtn.disabled = true;
        feedback.textContent = '';
        submitBtn.textContent = 'Jawab';
        submitBtn.classList.remove('btn-danger', 'btn-success');
        submitBtn.classList.add('btn-success');


        // Buat dan Tampilkan Pilihan Jawaban
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn', 'btn-outline-primary', 'option-btn');
            button.addEventListener('click', () => selectAnswer(option, button));
            optionsArea.appendChild(button);
        });

    } else {
        // Kuis Selesai
        showResult();
    }
}

function selectAnswer(option, button) {
    // Hapus class 'selected' dari semua tombol
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Tandai tombol yang dipilih
    button.classList.add('selected');
    selectedAnswer = option;
    submitBtn.disabled = false;
}

function checkAnswer() {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Non-aktifkan semua tombol pilihan setelah menjawab
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === currentQuestion.answer) {
        score++;
        feedback.textContent = "✅ Jawaban Anda Benar!";
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');

    } else {
        feedback.textContent = `❌ Jawaban Anda Salah. Jawaban yang benar adalah: ${currentQuestion.answer}`;
        feedback.classList.remove('text-success');
        feedback.classList.add('text-danger');
    }

    // Tampilkan jawaban yang benar/salah pada tombol
    optionButtons.forEach(btn => {
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add('btn-success');
            btn.classList.remove('btn-outline-primary', 'selected');
        } else if (btn.textContent === selectedAnswer) {
             btn.classList.add('btn-danger');
             btn.classList.remove('btn-outline-primary', 'selected');
        }
    });


    submitBtn.textContent = 'Lanjut';
    submitBtn.removeEventListener('click', checkAnswer);
    submitBtn.addEventListener('click', nextQuestion);
    submitBtn.disabled = false; // Aktifkan tombol Lanjut
}

function nextQuestion() {
    currentQuestionIndex++;
    submitBtn.removeEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', checkAnswer);
    loadQuestion();
}

function showResult() {
    quizArea.style.display = 'none';
    resultArea.style.display = 'block';
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = questions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultArea.style.display = 'none';
    quizArea.style.display = 'block';
    loadQuestion();
}


// 5. Inisialisasi Kuis dan Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    totalQuestionsDisplay.textContent = questions.length;
    loadQuestion(); // Muat pertanyaan pertama
    submitBtn.addEventListener('click', checkAnswer);
    restartBtn.addEventListener('click', restartQuiz);
});
