// ouvidoria.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-ouvidoria',
  templateUrl: './ouvidoria.component.html',
  styleUrls: ['./ouvidoria.component.scss']
})
export class OuvidoriaComponent implements OnInit {
  // Gravação de áudio
  gravando = false;
  mediaRecorder!: MediaRecorder;
  audioBlob: Blob | null = null;

  // Arquivos
  fotoFile: File | null = null;
  videoFile: File | null = null;

  // Forms por step
  identificacaoForm!: FormGroup;
  detalhesForm!: FormGroup;
  anexosForm!: FormGroup; // Mesmo que não tenha fields reativos, deixa como "dummy" p/ linear=true

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // STEP 1: Identificação
    this.identificacaoForm = this.fb.group({
      anonimo: [false],
      nome: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]],
    });

    // Quando alternar para anônimo, desabilitar/limpar nome
    this.identificacaoForm.get('anonimo')!.valueChanges.subscribe((isAnonimo: boolean) => {
      const nomeCtrl = this.identificacaoForm.get('nome')!;
      if (isAnonimo) {
        nomeCtrl.reset();
        nomeCtrl.disable({ emitEvent: false });
      } else {
        nomeCtrl.enable({ emitEvent: false });
      }
    });

    // STEP 2: Detalhes
    this.detalhesForm = this.fb.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
    });

    // STEP 3: Anexos (sem validação obrigatória)
    this.anexosForm = this.fb.group({
      // Campos fictícios caso queira validar algo depois
      dummy: ['']
    });
  }

  // ---------- ÁUDIO ----------
  async gravarAudio() {
    if (this.gravando) return;
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
    if (this.mediaRecorder && this.gravando) {
      this.mediaRecorder.stop();
    }
  }

  // ---------- FOTO ----------
  selecionarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fotoFile = input.files?.[0] ?? null;
  }

  // ---------- VÍDEO ----------
  selecionarVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.videoFile = input.files?.[0] ?? null;
  }

  // ---------- SUBMIT ----------
  enviar(stepper: MatStepper) {
    // Monte o payload final (ex.: FormData para enviar a um backend)
    const formData = new FormData();

    // Identificação
    const anonimo = !!this.identificacaoForm.getRawValue().anonimo;
    const nome = this.identificacaoForm.getRawValue().nome || null; // getRawValue para pegar desabilitados
    formData.append('anonimo', String(anonimo));
    if (!anonimo && nome) {
      formData.append('nome', nome);
    }

    // Detalhes
    formData.append('assunto', this.detalhesForm.value.assunto);
    formData.append('descricao', this.detalhesForm.value.descricao);

    // Áudio
    if (this.audioBlob) {
      formData.append('audio', this.audioBlob, 'gravacao.webm');
    }

    // Foto
    if (this.fotoFile) {
      formData.append('foto', this.fotoFile, this.fotoFile.name);
    }

    // Vídeo
    if (this.videoFile) {
      formData.append('video', this.videoFile, this.videoFile.name);
    }

    // Aqui você faria sua chamada HTTP (HttpClient)
    // this.http.post('/api/ouvidoria', formData).subscribe(...)

    console.log('ENVIANDO...');
    console.log('anonimo:', anonimo);
    console.log('nome:', nome);
    console.log('assunto:', this.detalhesForm.value.assunto);
    console.log('descricao:', this.detalhesForm.value.descricao);
    console.log('audio:', this.audioBlob);
    console.log('foto:', this.fotoFile);
    console.log('video:', this.videoFile);

    alert('Enviado!');
    stepper.reset();
    this.resetarEstadoArquivos();
  }

  private resetarEstadoArquivos() {
    this.audioBlob = null;
    this.fotoFile = null;
    this.videoFile = null;
  }
}