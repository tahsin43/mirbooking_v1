import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class FoldGuideService {
  async runFoldGuideTarget(
    guideSequence: string,
    targetSequence: string,
  ): Promise<string> {
    const process = spawn('java', [
      '-jar',
      'src/modules/mcfold/FoldGuideTarget.jar',
      guideSequence,
      targetSequence,
    ]);

    let output = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    return new Promise((resolve, reject) => {
      process.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(`Java process exited with code ${code}`);
        }
      });
    });
  }
}
