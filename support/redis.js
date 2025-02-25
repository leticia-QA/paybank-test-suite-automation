import { Queue } from "bullmq";

const connection = {
    host: 'paybank-redis',
    port: 6379

}

const queueName = 'twoFactorQueue'

const queue = new Queue(queueName, {connection})

export const getJob = async () => {
    const jobs = await queue.getJobs(); 
  
    // Verifique se há jobs antes de tentar acessar o primeiro
    if (jobs && jobs.length > 0) {
      return jobs[0].data.code;
    } else {
      throw new Error('Nenhum job encontrado');
    }
  };
  

export const cleanJobs = async () => {
   await queue.obliterate()
}