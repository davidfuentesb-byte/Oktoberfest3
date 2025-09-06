// data/schedule.ts
export type ProgramItem = {
    day: "Viernes (6 Dic)" | "Sábado (7 Dic)" | "Domingo (8 Dic)";
    time: string;
    title: string;
    desc?: string;
  };
  
  export const PROGRAM_2025: ProgramItem[] = [
    { day: "Viernes (6 Dic)", time: "17:00", title: "Apertura del recinto" },
    { day: "Viernes (6 Dic)", time: "18:00", title: "Música en vivo" },
    { day: "Viernes (6 Dic)", time: "20:00", title: "Competencias cerveceras" },
  
    { day: "Sábado (7 Dic)", time: "12:00", title: "Apertura y food trucks" },
    { day: "Sábado (7 Dic)", time: "16:00", title: "Catas guiadas" },
    { day: "Sábado (7 Dic)", time: "21:00", title: "Banda estelar" },
  
    { day: "Domingo (8 Dic)", time: "12:00", title: "Juegos y actividades familiares" },
    { day: "Domingo (8 Dic)", time: "15:00", title: "Clausura" },
  ];
  