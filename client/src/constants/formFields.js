export const tutorInfoFields = [
  {
    id: "tutorName",
    label: "Nome do Tutor",
    type: "text",
    required: true,
    placeholder: "Digite seu nome completo",
  },
  {
    id: "tutorEmail",
    label: "E-mail",
    type: "email",
    required: true,
    placeholder: "Digite seu e-mail",
  },
  {
    id: "tutorPhone",
    label: "Telefone",
    type: "tel",
    required: true,
    placeholder: "(00) 00000-0000",
  },
  {
    id: "tutorAddress",
    label: "Endereço",
    type: "text",
    required: true,
    placeholder: "Digite seu endereço completo",
  },
];

export const petInfoFields = [
  {
    id: "petName",
    label: "Nome do Pet",
    type: "text",
    required: true,
    placeholder: "Digite o nome do seu pet",
  },
  {
    id: "petSpecies",
    label: "Espécie",
    type: "select",
    required: true,
    options: [
      { value: "cachorro", label: "Cachorro" },
      { value: "gato", label: "Gato" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    id: "petBreed",
    label: "Raça",
    type: "text",
    required: true,
    placeholder: "Digite a raça do seu pet",
  },
  {
    id: "petSize",
    label: "Tamanho",
    type: "select",
    required: true,
    options: [
      { value: "pequeno", label: "Pequeno (até 10kg)" },
      { value: "medio", label: "Médio (10kg a 20kg)" },
      { value: "grande", label: "Grande (acima de 20kg)" },
    ],
  },
  {
    id: "petAge",
    label: "Idade",
    type: "number",
    required: true,
    placeholder: "Idade do pet em anos",
  },
];
