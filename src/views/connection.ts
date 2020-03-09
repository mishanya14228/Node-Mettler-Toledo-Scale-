import express, { RequestHandler } from 'express';
import { scaleCommunicationService } from '../services/scale_communication_service';
import { StatusResponse, ConnectResponse } from '../types';

export const connectionRouter = express.Router();

const StatusView: RequestHandler = (_, res) => {
  const resp: StatusResponse = { is_connected: scaleCommunicationService.isConnected };
  res.send(resp);
};

const ConnectView: RequestHandler = async (_, res) => {
  const response: ConnectResponse = await scaleCommunicationService.init();
  res.send(response);
};

const DisconnectView: RequestHandler = async (_, res) => {
  scaleCommunicationService.destroy();
  res.sendStatus(200);
};

connectionRouter.get('/status', StatusView);
connectionRouter.post('/connect', ConnectView);
connectionRouter.post('/disconnect', DisconnectView);
