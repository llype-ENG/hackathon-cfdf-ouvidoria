import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ouvidoria',
  templateUrl: './ouvidoria.component.html',
  styleUrls: ['./ouvidoria.component.scss']
})


export class OuvidoriaComponent {
  gravando = false;
  mediaRecorder!: MediaRecorder;

  audioBlob: Blob | null = null;
  fotoFile: File | null = null;
  videoFile: File | null = null;
  
  form = this.fb.group({
    anonimo: [false],
    nome: [''],
    assunto: [''],
    descricao: ['', [Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder) {}

  firstFormGroup!: FormGroup; 

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }
  // ÁUDIO --------------------------------------
  async gravarAudio() {
    this.gravando = true;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    this.mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(chunks, { type: 'audio/webm' });
      stream.getTracks().forEach(t => t.stop());
      this.gravando = false;
    };

    this.mediaRecorder.start();
  }

  pararAudio() {
    this.mediaRecorder.stop();
  }

  // FOTO ---------------------------------------
  selecionarFoto(event: any) {
    this.fotoFile = event.target.files[0] ?? null;
  }

  // VÍDEO --------------------------------------
  selecionarVideo(event: any) {
    this.videoFile = event.target.files[0] ?? null;
  }

  // SUBMIT -------------------------------------
  onSubmit() {
    console.log("Form:", this.form.value);
    console.log("Audio:", this.audioBlob);
    console.log("Foto:", this.fotoFile);
    console.log("Vídeo:", this.videoFile);

    alert('Enviado (simples)!');
  }

}
