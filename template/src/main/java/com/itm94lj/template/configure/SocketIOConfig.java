package com.itm94lj.template.configure;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.Transport;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import java.io.IOException;

@Configuration
public class SocketIOConfig {


    @Bean
    public SocketIOServer socketIOServer() throws IOException {
        com.corundumstudio.socketio.Configuration  config = new com.corundumstudio.socketio.Configuration();
        config.setHostname("0.0.0.0");
        config.setPort(9092);
        config.setMaxFramePayloadLength(1024*1024);
        config.setMaxHttpContentLength(1024*1024);
        SocketIOServer server = new SocketIOServer(config);

        return server;
    }

}
