import { Router } from "express";

export interface AuthRouterInterface{
    getRouter():Router;
}